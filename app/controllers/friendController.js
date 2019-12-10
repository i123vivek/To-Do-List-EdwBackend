const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib')
const AuthModel = mongoose.model('Auth');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const UserModel = mongoose.model('User')


let getAllRequestSent = (req, res) => {
    UserModel.find({ userId: req.params.userId })
        .select('friendRequestSent')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'friendController: getAllRequestSent', 10)
                let apiResponse = response.generate(true, 'Failed To Find Sent Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result[0].friendRequestSent)) {
                console.log("result of getallrequestsent is empty:", result)
                logger.info('No Sent Request Found', 'friendController: getAllRequestSent')
                let apiResponse = response.generate(true, 'No Sent Request Found', 404, null)
                res.send(apiResponse)
            } else {
                const requestSentResult = Array.from(new Set(result[0].friendRequestSent.map(x => x.friendId)))
                    .map(friendId => {
                        return {
                            friendId: friendId,
                            friendName: result[0].friendRequestSent.find(x => x.friendId === friendId).friendName
                        };
                    });
                console.log("friend requestsent here is:", requestSentResult)
                let apiResponse = response.generate(false, 'All Sent Requests Found', 200, requestSentResult)
                res.send(apiResponse)
            }
        })
}// end getAllRequestSent


let getAllRequestRecieved = (req, res) => {
    UserModel.find({ userId: req.params.userId })
        .select('friendRequestRecieved')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'friendController: getAllRequestRecieved', 10)
                let apiResponse = response.generate(true, 'Failed To Find Recieved Requests', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result[0].friendRequestRecieved)) {
                logger.info('No Recieved Request Found', 'friendController: getAllRequestRecieved')
                let apiResponse = response.generate(true, 'No Recieved Request Found', 404, null)
                res.send(apiResponse)
            } else {
                const requestReceivedResult = Array.from(new Set(result[0].friendRequestRecieved.map(x => x.friendId)))
                    .map(friendId => {
                        return {
                            friendId: friendId,
                            friendName: result[0].friendRequestRecieved.find(x => x.friendId === friendId).friendName
                        };
                    });
                console.log("friend requestsent here is:", requestReceivedResult)
                let apiResponse = response.generate(false, 'All Recieved Requests Found', 200, requestReceivedResult)
                res.send(apiResponse)
            }
        })
}// end getAllRequestRecieved

let getAllFriend = (req, res) => {
    UserModel.find({ userId: req.params.userId })
        .select('friends')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'friendController: getAllFriend', 10)
                let apiResponse = response.generate(true, 'Failed To Find friends', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Friend Found', 'friendController: getAllFriend')
                let apiResponse = response.generate(true, 'No friend Found', 404, null)
                res.send(apiResponse)
            } else {

                console.log("frienddfghfgh here is:", result.length)
                const friendResult = Array.from(new Set(result[0].friends.map(x => x.friendId)))
                    .map(friendId => {
                        return {
                            friendId: friendId,
                            friendName: result[0].friends.find(x => x.friendId === friendId).friendName
                        };
                    });
                console.log("friend here is:", friendResult)
                let apiResponse = response.generate(false, 'All friends Found', 200, friendResult)
                res.send(apiResponse)
            }
        })
}// end getAllRequestRecieved


let sendFriendRequest = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Sending request', 'friendController: sendFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSender = () => {
        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }

        let options = {
            $push: {
                friendRequestSent: { $each: [subOptions] }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ userId: req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateSender', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'friendController: updateSender')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    console.log("result here is: ", result)
                    let apiResponse = response.generate(false, 'Updated Sender with sent requests', 200, result)
                    resolve(apiResponse)

                }
            });// end user model update
        })
    } //end updateSender

    let updateReciever = () => {
        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let options = {
            $push: {
                friendRequestRecieved: {
                    $each: [subOptions]
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ userId: req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateReciever', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciever not Found', 'friendController: updateReciever')
                    let apiResponse = response.generate(true, 'Reciever not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Reciever with Recieved requests', 200, null)
                    resolve(result)
                }
            });// end user model update
        })
    } //end updateReciever

    validateUserInput(req, res)
        .then(updateSender)
        .then(updateReciever)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Friend Request Sent', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.send(err)
        })
} // end of sending friend request function.


let acceptFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: acceptFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSenderFriendList = () => {

        let subOptions = {
            friendId: req.body.recieverId,
            friendName: req.body.recieverName,
        }

        let options = {
            $push: {
                friends: {
                    $each: [subOptions]
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateSenderFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'friendController: updateSenderFriendList')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Friend List', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderFriendList

    let updateRecieverFriendList = () => {

        let subOptions = {
            friendId: req.body.senderId,
            friendName: req.body.senderName,
        }

        let options = {
            $push: {
                friends: {
                    $each: [subOptions]
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateRecieverFriendList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciver Friend List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'friendController: updateRecieverFriendList')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Reciever Friend List', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverFriendList

    let updateSenderSentRequest = () => {

        let options = {
            $pull: {
                friendRequestSent: {
                    friendId: req.body.recieverId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateSenderSentRequest', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Sent Request', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'friendController: updateSenderSentRequest')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Sent Request', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderSentRequest

    let updateRecieverRequestRecieved = () => {

        let options = {
            $pull: {
                friendRequestRecieved: {
                    friendId: req.body.senderId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateRecieverRequestRecieved', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever Requests Recieved', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'friendController: updateRecieverRequestRecieved')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Recievers Requests Recieved', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverRequestRecieved

    validateUserInput(req, res)
        .then(updateSenderFriendList)
        .then(updateRecieverFriendList)
        .then(updateSenderSentRequest)
        .then(updateRecieverRequestRecieved)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Accepted Friend Request', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
} // end of acceptFriendRequest function.


let cancelFriendRequest = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Cancelling request', 'friendController: cancelFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSender = () => {

        let options = {
            $pull: {
                friendRequestSent: {
                    friendId: req.body.recieverId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'Friend Controller:updateSender', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'Friend Controller: updateSender')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender with sent requests', 200, result)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSender

    let updateReciever = () => {

        let options = {
            $pull: {
                friendRequestRecieved: {
                    friendId: req.body.senderId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'Friend Controller:updateReciever', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciever not Found', 'Friend Controller: updateReciever')
                    let apiResponse = response.generate(true, 'Reciever not Found', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            });// end user model update
        })
    } //end updateReciever

    validateUserInput(req, res)
        .then(updateSender)
        .then(updateReciever)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Canceled Friend Request', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}


let rejectFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: rejectFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input


    let updateSenderSentRequest = () => {

        let options = {
            $pull: {
                friendRequestSent: {
                    friendId: req.body.recieverId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.senderId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateSenderSentRequest', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Sender Sent Request', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Sender not Found', 'friendController: updateSenderSentRequest')
                    let apiResponse = response.generate(true, 'Sender not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Sender Sent Request', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateSenderSentRequest

    let updateRecieverRequestRecieved = () => {

        let options = {
            $pull: {
                friendRequestRecieved: {
                    friendId: req.body.senderId
                }
            }
        }

        return new Promise((resolve, reject) => {
            UserModel.updateOne({ 'userId': req.body.recieverId }, options).exec((err, result) => {
                if (err) {
                    console.log("Error in verifying", err)
                    logger.error(err.message, 'friendController:updateRecieverRequestRecieved', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Reciever Requests Recieved', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('Reciver not Found', 'friendController: updateRecieverRequestRecieved')
                    let apiResponse = response.generate(true, 'Reciver not Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Updated Recievers Requests Recieved', 200, null)
                    resolve(apiResponse)
                }
            });// end user model update
        })
    } //end updateRecieverRequestRecieved

    validateUserInput(req, res)
        .then(updateSenderSentRequest)
        .then(updateRecieverRequestRecieved)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Rejected Friend Request', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
} // end of rejectFriendRequest function.



let unfriendFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.senderId && req.body.senderName && req.body.recieverId && req.body.recieverName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Accepting request', 'friendController: acceptFriendRequest', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let updateSenderFriendList = () => {

        return new Promise((resolve, reject) => {
            UserModel.update({ 'userId': req.body.senderId },
                { $pull: { friends: { friendId: req.body.recieverId, friendName: req.body.recieverName } } },
                { safe: true }
            )
                .exec((err, friendDetails) => {
                    if (err) {
                        logger.error(err.message, 'friendController: updateSenderFriendList', 10)
                        let apiResponse = response.generate(true, 'Failed To update sender friend list', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(friendDetails)) {
                        logger.info('RecieverId not Found', 'friendController: updateSenderFriendList')
                        let apiResponse = response.generate(true, 'RecieverId not Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log("friend details here is:", friendDetails)
                        let apiResponse = response.generate(false, 'Updated Sender Friend List', 200, friendDetails)
                        resolve(apiResponse)

                    }
                })
        })


    } //end updateSenderFriendList

    let updateRecieverFriendList = () => {
        return new Promise((resolve, reject) => {
            UserModel.update({ 'userId': req.body.recieverId },
                { $pull: { friends: { friendId: req.body.senderId, friendName: req.body.senderName } } },
                { safe: true })
                .exec((err, friendDetails) => {
                    if (err) {
                        logger.error(err.message, 'friendController: updateRecieverFriendList', 10)
                        let apiResponse = response.generate(true, 'Failed To update receiver friend list', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(friendDetails)) {
                        logger.info('senderId not Found', 'friendController: updateRecieverFriendList')
                        let apiResponse = response.generate(true, 'senderId not Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log("friend details here is:", friendDetails)
                        let apiResponse = response.generate(false, 'Updated Reciver Friend List', 200, friendDetails)
                        resolve(apiResponse)

                    }
                })
        })
    } //end updateRecieverFriendList


    validateUserInput(req, res)
        .then(updateSenderFriendList)
        .then(updateRecieverFriendList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Unfriend User', 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
} // end of unfriendFunction function.


module.exports = {
    getAllRequestSent: getAllRequestSent,
    getAllFriend: getAllFriend,
    getAllRequestRecieved: getAllRequestRecieved,
    sendFriendRequest: sendFriendRequest,
    acceptFriendRequest: acceptFriendRequest,
    cancelFriendRequest: cancelFriendRequest,
    rejectFriendRequest: rejectFriendRequest,
    unfriendFunction: unfriendFunction

}// end exports