const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const UserModel = mongoose.model('User')
const NotificationModel = mongoose.model('Notification')
const friendController = require("../controllers/friendController");

const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'

const time = require('./timeLib');


let setServer = (server) => {
    let allOnlineUsers = [];

    let io = socketio.listen(server);

    let myIo = io.of('/');



    myIo.on('connection', (socket) => {

        console.log("on connection--emitting verify user");
        socket.emit('verifyUser', "");

        // code to verify user and make him online.

        socket.on('set-user', (authToken) => {
            console.log("set-user called");
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else {
                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    socket.userId = currentUser.userId;
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);
                    //socket.emit(currentUser.userId, "you are online")

                    let userObj = { userId: currentUser.userId, fullName: fullName }
                    allOnlineUsers.push(userObj)
                    console.log("all online user list here is:", allOnlineUsers);

                    // setting room name
                    socket.room = 'friendRoom'
                    // joining friend-group room.
                    socket.join(socket.room)
                    socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);


                }
            })

        })



        //user operations
        socket.on('send-friend-request', (data) => {
            console.log("socket send friend request called", data);
            console.log(data.recieverId)
            setTimeout(function () {
                eventEmitter.emit('save-on-send-friend-request', data);

            }, 1000)
            myIo.emit(data.recieverId, data);
        })


        socket.on('cancel-friend-request', (data) => {
            console.log("socket cancel friend request called", data);
            console.log(data.recieverId)
            setTimeout(function () {
                eventEmitter.emit('save-on-cancel-friend-request', data);

            }, 1000)
            myIo.emit(data.recieverId, data);
        })

        socket.on('reject-friend-request', (data) => {
            console.log("socket reject friend request called", data);
            console.log(data.senderId)
            setTimeout(function () {
                eventEmitter.emit('save-on-reject-friend-request', data);

            }, 1000)
            myIo.emit(data.senderId, data);
        })

        socket.on('accept-friend-request', (data) => {
            console.log("socket accept friend request called", data);
            console.log(data.senderId)
            setTimeout(function () {
                eventEmitter.emit('save-on-accept-friend-request', data);

            }, 1000)
            myIo.emit(data.senderId, data);
        })

        // function to send notification.
        socket.on("sendMyNotification", (userId) => {
            console.log("in on fun")
            NotificationModel.find({ userIdToSendNotification: userId, notificationStatus: "un-seen" }, (err, result) => {
                if (err) {
                    console.log("error while finding notification: ", err)
                    logger.error(err.message, 'socketlib: sendMyNotification', 10)

                } else {
                    console.log("notificationObj found successfully", result)
                    logger.info("notificationObj found successfully", 'socketlib: sendMyNotification', 1)
                    socket.emit("YourNotifications", result);
                }
            })
        }) // end of send my notification function. 


        socket.on('disconnect', () => {
            console.log("user is disconnected");
            console.log(socket.userId);

            var removeIndex = allOnlineUsers.map(function (user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex, 1)
            console.log("online user on disconnect", allOnlineUsers);

            socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);
            socket.leave(socket.room)
        })

    })


}

eventEmitter.on('save-on-send-friend-request', (data) => {

    let recieverObj = {
        friendId: data.recieverId,
        friendName: data.recieverName,
    }
    let recOptions = {
        $push: {
            friendRequestSent: { $each: [recieverObj] }
        }
    }

    UserModel.updateOne({ userId: data.senderId }, recOptions).exec((err, result) => {
        if (err) {
            console.log("Error occured while updating", err)
        } else if (check.isEmpty(result)) {
            console.log("senderId not found");
        } else {
            console.log("result here is: ", result)

        }
    });


    let senderObj = {
        friendId: data.senderId,
        friendName: data.senderName,
    }
    let senOptions = {
        $push: {
            friendRequestRecieved: {
                $each: [senderObj]
            }
        }
    }


    UserModel.updateOne({ userId: data.recieverId }, senOptions).exec((err, result) => {
        if (err) {
            console.log("Error while updating receiver", err)

        } else if (check.isEmpty(result)) {

            console.log("recieverId not found");
        } else {

            console.log("result here in reciever is: ", result)
        }
    });// end user model update


})

eventEmitter.on('save-on-cancel-friend-request', (data) => {

    let senderOptions = {
        $pull: {
            friendRequestSent: {
                friendId: data.recieverId
            }
        }
    }

    UserModel.updateOne({ userId: data.senderId }, senderOptions).exec((err, result) => {
        if (err) {
            console.log("Error occured while updating", err)
        } else if (check.isEmpty(result)) {
            console.log("senderId not found");
        } else {
            console.log("result here is: ", result)

        }
    });


    let receiverOptions = {
        $pull: {
            friendRequestRecieved: {
                friendId: data.senderId
            }
        }
    }


    UserModel.updateOne({ userId: data.recieverId }, receiverOptions).exec((err, result) => {
        if (err) {
            console.log("Error while updating receiver", err)

        } else if (check.isEmpty(result)) {

            console.log("recieverId not found");
        } else {

            console.log("result here in reciever is: ", result)
        }
    });// end user model update


})


eventEmitter.on('save-on-reject-friend-request', (data) => {

    let senderOptions = {
        $pull: {
            friendRequestSent: {
                friendId: data.recieverId
            }
        }
    }

    UserModel.updateOne({ userId: data.senderId }, senderOptions).exec((err, result) => {
        if (err) {
            console.log("Error occured while updating", err)
        } else if (check.isEmpty(result)) {
            console.log("senderId not found");
        } else {
            console.log("result here is: ", result)

        }
    });


    let receiverOptions = {
        $pull: {
            friendRequestRecieved: {
                friendId: data.senderId
            }
        }
    }
    UserModel.updateOne({ userId: data.recieverId }, receiverOptions).exec((err, result) => {
        if (err) {
            console.log("Error while updating receiver", err)

        } else if (check.isEmpty(result)) {

            console.log("recieverId not found");
        } else {

            console.log("result here in reciever is: ", result)
        }
    });// end user model update


})


eventEmitter.on('save-on-accept-friend-request', (data) => {

    let subOptions = {
        friendId: data.recieverId,
        friendName: data.recieverName,
    }

    let senderOptions = {
        $push: {
            friends: {
                $each: [subOptions]
            }
        }
    }

    UserModel.updateOne({ userId: data.senderId }, senderOptions).exec((err, result) => {
        if (err) {
            console.log("Error occured while updating", err)
        } else if (check.isEmpty(result)) {
            console.log("senderId not found");
        } else {
            console.log("result here is: ", result)

        }
    });

    let recSubOptions = {
        friendId: data.senderId,
        friendName: data.senderName,
    }

    let receiverOptions = {
        $push: {
            friends: {
                $each: [recSubOptions]
            }
        }
    }


    UserModel.updateOne({ userId: data.recieverId }, receiverOptions).exec((err, result) => {
        if (err) {
            console.log("Error while updating receiver", err)

        } else if (check.isEmpty(result)) {

            console.log("recieverId not found");
        } else {

            console.log("result here in reciever is: ", result)
        }
    });// end user model update


})
module.exports = {
    setServer: setServer
}