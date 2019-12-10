const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const AuthModel = mongoose.model('Auth');
const UserModel = mongoose.model('User');
const ListModel = mongoose.model('List');
const ItemModel = mongoose.model('Item');
const HistoryModel = mongoose.model('History');
const NotificationModel = mongoose.model('Notification');
const mailer = require("../libs/nodemailerLib");
const events = require('events');
const eventEmitter = new events.EventEmitter();

//for list create

let createNewNotificationListObj = (listData) => {

    console.log("list data in create notification is:", listData);
    let peopleToSendNotification = [];


    NotificationModel.findOne({ notificationListId: listData.listId, notificationPurpose: "list-Create" }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'notificationController: createNewNotificationListObj', 10)
            let apiResponse = response.generate(true, 'error while finding list details', 400, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
                if (error) {
                    console.log(error);
                    logger.error(error.message, 'notificationController: createNewNotificationListObj', 10)
                    let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(userResult)) {
                    logger.info("no user found", "notificationController: createNewNotificationListObj")
                    let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
                    res.send(apiResponse);
                } else {
                    peopleToSendNotification.push(userResult.userId);
                    for (let x of userResult.friends) {
                        peopleToSendNotification.push(x.friendId);
                    }
                    console.log("people id to send notification on list create is", peopleToSendNotification);
                    let newNotificationObj = new NotificationModel({
                        notificationId: shortid.generate(),
                        notificationListId: listData.listId,
                        notificationMessage: `${listData.listCreatorName} added a list with listName :- ${listData.listName} and listId is :- ${listData.listId}`,
                        userIdToSendNotification: peopleToSendNotification,
                        notificationPurpose: 'list-Create',
                        notificationStatus: "un-seen",
                        notificationCreatedOn: time.now()
                    })
                    newNotificationObj.save((err, result) => {
                        if (err) {
                            console.log("error while saving notification: ", err)
                            logger.error(err.message, 'notificationController: createNewNotification', 10)
                        } else {
                            console.log("notificationObj Created & saved successfully", result)
                            logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                        }
                    })
                }

            })
        } else {
            console.log("notification obj allready exists for the purpose ", err)
            logger.error('notification obj allready exists for the purpose', 'notificationController: createNewNotification', 10)
        }
    })
} // end of createNewNotificationListObj function.

let createANewNotificationObjOnListEdit = (listData) => {
    let peopleToSendNotification = [];

    UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
        if (error) {
            console.log(error);
            logger.error(error.message, 'notificationController: createANewNotificationObjOnListEdit', 10)
            let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userResult)) {
            logger.info("no user found", "notificationController: createANewNotificationObjOnListEdit")
            let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
            res.send(apiResponse);
        } else {
            peopleToSendNotification.push(userResult.userId);
            for (let x of userResult.friends) {
                peopleToSendNotification.push(x.friendId);
            }
            console.log("people id to send notification on list edit is", peopleToSendNotification);
            let newNotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationListId: listData.listId,
                notificationMessage: `${listData.listModifierName} edited a list with listName :- ${listData.listName} and listId is :- ${listData.listId}`,
                userIdToSendNotification: peopleToSendNotification,
                notificationPurpose: 'list-edit',
                notificationStatus: "un-seen",
                notificationCreatedOn: time.now()
            })
            newNotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notification: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)
                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }
    })

} // end of createANewNotificationObjOnListEdit function.


let createANewNotificationObjOnListDelete = (listData) => {
    let peopleToSendNotification = [];

    UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
        if (error) {
            console.log(error);
            logger.error(error.message, 'notificationController: createANewNotificationObjOnListDelete', 10)
            let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userResult)) {
            logger.info("no user found", "notificationController: createANewNotificationObjOnListDelete")
            let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
            res.send(apiResponse);
        } else {
            peopleToSendNotification.push(userResult.userId);
            for (let x of userResult.friends) {
                peopleToSendNotification.push(x.friendId);
            }
            console.log("people id to send notification on list delete is", peopleToSendNotification);
            let newNotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationListId: listData.listId,
                notificationMessage: ` deleted a list with listName :- ${listData.listName} and listId is :- ${listData.listId}`,
                userIdToSendNotification: peopleToSendNotification,
                notificationPurpose: 'list-delete',
                notificationStatus: "un-seen",
                notificationCreatedOn: time.now()
            })
            newNotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notification: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)
                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }
    })

} // end of createANewNotificationObjOnListDelete function.


let createANewNotificationObjOnItemCreate = (listData, itemData) => {
    console.log("list data for adding item to list is:", listData);
    console.log("item data for adding item to list is:", itemData);

    let peopleToSendNotification = [];


    NotificationModel.findOne({ notificationListId: itemData.listId, notificationItemId: itemData.itemId, notificationPurpose: "item-Create" }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'notificationController: createANewNotificationObjOnItemCreate', 10)
            let apiResponse = response.generate(true, 'error while finding list details', 400, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
                if (error) {
                    console.log(error);
                    logger.error(error.message, 'notificationController: createANewNotificationObjOnItemCreate', 10)
                    let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(userResult)) {
                    logger.info("no user found", "notificationController: createANewNotificationObjOnItemCreate")
                    let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
                    res.send(apiResponse);
                } else {
                    peopleToSendNotification.push(userResult.userId);
                    for (let x of userResult.friends) {
                        peopleToSendNotification.push(x.friendId);
                    }
                    console.log("people id to send notification on item create is", peopleToSendNotification);
                    let newNotificationObj = new NotificationModel({
                        notificationId: shortid.generate(),
                        notificationListId: itemData.listId,
                        notificationItemId: itemData.itemId,
                        notificationMessage: `${itemData.itemCreatorName} added an item with itemId :- ${itemData.itemId} and itemName :- ${itemData.itemName} to a list with listId :- ${itemData.listId} and listName :- ${listData.listName}`,
                        userIdToSendNotification: peopleToSendNotification,
                        notificationPurpose: 'item-Create',
                        notificationStatus: "un-seen",
                        notificationCreatedOn: time.now()
                    })
                    newNotificationObj.save((err, result) => {
                        if (err) {
                            console.log("error while saving notification: ", err)
                            logger.error(err.message, 'notificationController: createNewNotification', 10)
                        } else {
                            console.log("notificationObj Created & saved successfully", result)
                            logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                        }
                    })
                }

            })
        } else {
            console.log("notification obj allready exists for the purpose ", err)
            logger.error('notification obj allready exists for the purpose', 'notificationController: createNewNotification', 10)
        }
    })

}


let createANewNotificationObjOnItemDelete = (listData, itemData) => {
    console.log("list data for deleting item of list is:", listData);
    console.log("item data for deleting item of list is:", itemData);

    let peopleToSendNotification = [];

    UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
        if (error) {
            console.log(error);
            logger.error(error.message, 'notificationController: createANewNotificationObjOnItemDelete', 10)
            let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userResult)) {
            logger.info("no user found", "notificationController: createANewNotificationObjOnItemDelete")
            let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
            res.send(apiResponse);
        } else {
            peopleToSendNotification.push(userResult.userId);
            for (let x of userResult.friends) {
                peopleToSendNotification.push(x.friendId);
            }
            console.log("people id to send notification on item delete is", peopleToSendNotification);
            let newNotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationListId: itemData.listId,
                notificationItemId: itemData.itemId,
                notificationMessage: ` deleted an item with itemId :- ${itemData.itemId} and itemName :- ${itemData.itemName} of a list with listId :- ${itemData.listId} and listName :- ${listData.listName}`,
                userIdToSendNotification: peopleToSendNotification,
                notificationPurpose: 'item-delete',
                notificationStatus: "un-seen",
                notificationCreatedOn: time.now()
            })
            newNotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notification: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)
                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }

    })
}


let createANewNotificationObjOnItemEdit = (listData, itemData) => {
    console.log("list data for editing item of list is:", listData);
    console.log("item data for editing item of list is:", itemData);

    let peopleToSendNotification = [];

    UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
        if (error) {
            console.log(error);
            logger.error(error.message, 'notificationController: createANewNotificationObjOnItemEdit', 10)
            let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userResult)) {
            logger.info("no user found", "notificationController: createANewNotificationObjOnItemEdit")
            let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
            res.send(apiResponse);
        } else {
            peopleToSendNotification.push(userResult.userId);
            for (let x of userResult.friends) {
                peopleToSendNotification.push(x.friendId);
            }
            console.log("people id to send notification on item edit is", peopleToSendNotification);
            let newNotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationListId: itemData.listId,
                notificationItemId: itemData.itemId,
                notificationMessage: `${itemData.itemModifierName} edited an item with itemId :- ${itemData.itemId} and itemName :- ${itemData.itemName} of a list with listId :- ${itemData.listId} and listName :- ${listData.listName}`,
                userIdToSendNotification: peopleToSendNotification,
                notificationPurpose: 'item-edit',
                notificationStatus: "un-seen",
                notificationCreatedOn: time.now()
            })
            newNotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notification: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)
                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }

    })
}

let createANewNotificationObjOnSubItemAdd = (listData, itemData, subOptions) => {
    console.log("list data for adding subItem to item is:", listData);
    console.log("item data for adding subItem to item is:", itemData);
    console.log("subItemId for adding subItem to item is:", subOptions.subItemId);

    let peopleToSendNotification = [];
    NotificationModel.findOne({ notificationListId: itemData.listId, notificationItemId: itemData.itemId, notificationSubItemId: subOptions.subItemId, notificationPurpose: "subItem-Create" }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'notificationController: createANewNotificationObjOnSubItemAdd', 10)
            let apiResponse = response.generate(true, 'errror while finding notification detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
                if (error) {
                    console.log(error);
                    logger.error(error.message, 'notificationController: createANewNotificationObjOnSubItemAdd', 10)
                    let apiResponse = response.generate(true, 'error while finding user detail', 500, null)
                    res.send(apiResponse)
                } else if (check.isEmpty(userResult)) {
                    logger.info("no user found", "notificationController: createANewNotificationObjOnSubItemAdd")
                    let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
                    res.send(apiResponse);
                } else {
                    peopleToSendNotification.push(userResult.userId);
                    for (let x of userResult.friends) {
                        peopleToSendNotification.push(x.friendId);
                    }
                    console.log("people id to send notification on adding subItem to an item is", peopleToSendNotification);
                    let newNotificationObj = new NotificationModel({
                        notificationId: shortid.generate(),
                        notificationListId: itemData.listId,
                        notificationItemId: itemData.itemId,
                        notificationSubItemId: subOptions.subItemId,
                        notificationMessage: `${subOptions.subItemCreatorName} added a subItem with name :- ${subOptions.subItemName} to an item :- ${itemData.itemName}`,
                        userIdToSendNotification: peopleToSendNotification,
                        notificationPurpose: 'subItem-Create',
                        notificationStatus: "un-seen",
                        notificationCreatedOn: time.now()
                    })
                    newNotificationObj.save((err, result) => {
                        if (err) {
                            console.log("error while saving notification: ", err)
                            logger.error(err.message, 'notificationController: createNewNotification', 10)
                        } else {
                            console.log("notificationObj Created & saved successfully", result)
                            logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                        }
                    })
                }

            })
        } else {
            console.log("notification obj allready exists for the purpose ", err)
            logger.error('notification obj allready exists for the purpose', 'notificationController: createNewNotification', 10)
        }
    })
} // end of createANewNotificationObjOnSubItemAdd function.



let createANewNotificationObjOnSubItemDelete = (listData, itemData, subItemData) => {
    console.log("list data for deleting subItem of item is:", listData);
    console.log("item data for deleting subItem of item is:", itemData);
    console.log("subItem data for deleting subItem of item is:", subItemData);

    let peopleToSendNotification = [];

    UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
        if (error) {
            console.log(error);
            logger.error(error.message, 'notificationController: createANewNotificationObjOnSubItemDelete', 10)
            let apiResponse = response.generate(true, 'errror while finding user detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userResult)) {
            logger.info("no user found", "notificationController: createANewNotificationObjOnSubItemDelete")
            let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
            res.send(apiResponse);
        } else {
            peopleToSendNotification.push(userResult.userId);
            for (let x of userResult.friends) {
                peopleToSendNotification.push(x.friendId);
            }
            console.log("people id to send notification on subItem delete is", peopleToSendNotification);
            let newNotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationListId: itemData.listId,
                notificationItemId: itemData.itemId,
                notificationSubItemId: subItemData.$pull.subItems.subItemId,
                notificationMessage: `${subItemData.itemModifierName} deleted a subItem of id :- ${subItemData.$pull.subItems.subItemId} of an item :- ${itemData.itemName}`,
                userIdToSendNotification: peopleToSendNotification,
                notificationPurpose: 'subItem-delete',
                notificationStatus: "un-seen",
                notificationCreatedOn: time.now()
            })
            newNotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notification: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)
                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }

    })
}


let createANewNotificationObjOnSubItemEdit = (listData, itemData, subItemId, subItemName) => {
    console.log("list data for editing subItem of item is:", listData);
    console.log("item data for editing subItem of item is:", itemData);
    console.log("subItemId for editing subItem of item is:", subItemId);
    console.log("subItemName for editing subItem of item is:", subItemName);

    let peopleToSendNotification = [];

    UserModel.findOne({ userId: listData.listCreatorId }, (error, userResult) => {
        if (error) {
            console.log(error);
            logger.error(error.message, 'notificationController: createANewNotificationObjOnSubItemEdit', 10)
            let apiResponse = response.generate(true, 'error while finding user detail', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userResult)) {
            logger.info("no user found", "notificationController: createANewNotificationObjOnSubItemEdit")
            let apiResponse = response.generate(true, 'no user found as list creator id', 404, null)
            res.send(apiResponse);
        } else {
            peopleToSendNotification.push(userResult.userId);
            for (let x of userResult.friends) {
                peopleToSendNotification.push(x.friendId);
            }
            console.log("people id to send notification on subItem edit is", peopleToSendNotification);
            let newNotificationObj = new NotificationModel({
                notificationId: shortid.generate(),
                notificationListId: itemData.listId,
                notificationItemId: itemData.itemId,
                notificationSubItemId: subItemId,
                notificationMessage: `${itemData.itemModifierName} edited a subItem :- ${subItemId}, ${subItemName} of item :- ${itemData.itemName}`,
                userIdToSendNotification: peopleToSendNotification,
                notificationPurpose: 'subItem-edit',
                notificationStatus: "un-seen",
                notificationCreatedOn: time.now()
            })
            newNotificationObj.save((err, result) => {
                if (err) {
                    console.log("error while saving notification: ", err)
                    logger.error(err.message, 'notificationController: createNewNotification', 10)
                } else {
                    console.log("notificationObj Created & saved successfully", result)
                    logger.info("notificationObj Created successfully", 'notificationController: createNewNotification', 1)
                }
            })
        }

    })
}


let markNotificationAsSeen = (req, res) => {
    console.log("notification id is:", req.query.notificationId)



    let options = {
        notificationStatus: "seen"

    }


    NotificationModel.findOneAndUpdate({ 'notificationId': req.query.notificationId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'notificationController: markAsSeen', 10)
            let apiResponse = response.generate(true, 'Failed To edit notification details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No notification Found', 'notificationController: markAsSeen')
            let apiResponse = response.generate(true, 'No notification Found', 404, null)
            res.send(apiResponse)
        } else {
            console.log("Marked As Seen");
            let apiResponse = response.generate(false, "Marked As Seen", 200, result)

            res.send(apiResponse)
            console.log(result);
        }
    })

}



module.exports = {
    createNewNotificationListObj: createNewNotificationListObj,
    createANewNotificationObjOnListEdit: createANewNotificationObjOnListEdit,
    createANewNotificationObjOnListDelete: createANewNotificationObjOnListDelete,

    createANewNotificationObjOnItemCreate: createANewNotificationObjOnItemCreate,
    createANewNotificationObjOnItemDelete: createANewNotificationObjOnItemDelete,
    createANewNotificationObjOnItemEdit: createANewNotificationObjOnItemEdit,

    createANewNotificationObjOnSubItemAdd: createANewNotificationObjOnSubItemAdd,
    createANewNotificationObjOnSubItemDelete: createANewNotificationObjOnSubItemDelete,
    createANewNotificationObjOnSubItemEdit: createANewNotificationObjOnSubItemEdit,

    markNotificationAsSeen: markNotificationAsSeen

}
