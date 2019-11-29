const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')
const shortid = require('shortid');
const time = require('../libs/timeLib');


/* Models */
const HistoryModel = mongoose.model('History')
const ItemModel = mongoose.model('Item')
const ListModel = mongoose.model('List')

let addHistoryObjOnListDelete = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, listId: historyObj.listId, actionPerformedOn: 'list-delete' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnListDelete', 10)
        } else if (check.isEmpty(result)) {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                listId: historyObj.listId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on list delete: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnListDelete', 10)

                } else {
                    console.log("historyObj Created & saved successfully on list delete", result)
                    logger.info("historyObj Created successfully on list delete", 'historyController: addHistoryObjOnListDelete', 1)
                }
            })
        }
    })
}

let addHistoryObjOnListEdit = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, listId: historyObj.listId, actionPerformedOn: 'list-edit' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnListEdit', 10)
        } else {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                listId: historyObj.listId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on list edit: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnListEdit', 10)

                } else {
                    console.log("historyObj Created & saved successfully on list edit", result)
                    logger.info("historyObj Created successfully on list edit", 'historyController: addHistoryObjOnListEdit', 1)
                }
            })
        }
    })
}

let addHistoryObjOnItemDelete = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, itemId: historyObj.itemId, actionPerformedOn: 'item-delete' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnItemDelete', 10)
        } else if (check.isEmpty(result)) {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                itemId: historyObj.itemId,
                listId: historyObj.listId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on item delete: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnItemDelete', 10)

                } else {
                    console.log("historyObj Created & saved successfully on item delete", result)
                    logger.info("historyObj Created successfully on item delete", 'historyController: addHistoryObjOnItemDelete', 1)
                }
            })
        }
    })
}

let addHistoryObjOnItemEdit = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, itemId: historyObj.itemId, actionPerformedOn: 'item-edit' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnItemEdit', 10)
        } else {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                listId: historyObj.listId,
                itemId: historyObj.itemId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on item edit: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnItemEdit', 10)

                } else {
                    console.log("historyObj Created & saved successfully on item edit", result)
                    logger.info("historyObj Created successfully on item edit", 'historyController: addHistoryObjOnItemEdit', 1)
                }
            })
        }
    })
}


let addHistoryObjOnSubItemAdd = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, itemId: historyObj.itemId, actionPerformedOn: 'subItem-add' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnSubItemAdd', 10)
        } else {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                listId: historyObj.listId,
                itemId: historyObj.itemId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on subItem add: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnSubItemAdd', 10)

                } else {
                    console.log("historyObj Created & saved successfully on subItem add", result)
                    logger.info("historyObj Created successfully on subItem add", 'historyController: addHistoryObjOnSubItemAdd', 1)
                }
            })
        }
    })
}


let addHistoryObjOnSubItemDelete = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, itemId: historyObj.itemId, actionPerformedOn: 'subItem-delete' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnSubItemDelete', 10)
        } else {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                itemId: historyObj.itemId,
                listId: historyObj.listId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on subItem delete: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnSubItemDelete', 10)

                } else {
                    console.log("historyObj Created & saved successfully on subItem delete", result)
                    logger.info("historyObj Created successfully on subItem delete", 'historyController: addHistoryObjOnSubItemDelete', 1)
                }
            })
        }
    })
}


let addHistoryObjOnSubItemEdit = (historyObj) => {
    HistoryModel.findOne({ listCreatorUserId: historyObj.listCreatorUserId, itemId: historyObj.itemId, actionPerformedOn: 'subItem-edit' }, (err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'historyController: addHistoryObjOnSubItemEdit', 10)
        } else {
            let newHistoryObj = new HistoryModel({
                historyId: shortid.generate(),
                actionPerformedOn: historyObj.actionPerformedOn,
                objectToRestore: historyObj.objectToRestore,
                listId: historyObj.listId,
                itemId: historyObj.itemId,
                listCreatorUserId: historyObj.listCreatorUserId,
                storedTime: historyObj.sortedTime
            })

            newHistoryObj.save((err, result) => {
                if (err) {
                    console.log("error while saving history data on subItem edit: ", err)
                    logger.error(err.message, 'historyController: addHistoryObjOnSubItemEdit', 10)

                } else {
                    console.log("historyObj Created & saved successfully on subItem edit", result)
                    logger.info("historyObj Created successfully on subItem edit", 'historyController: addHistoryObjOnSubItemEdit', 1)
                }
            })
        }
    })
}


// function to get all history of a user.

let getAllHistoryOfAUser = (req, res) => {

    let findUserDetails = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId })
                .select()
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'historyController: findUserDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No User Found', 'historyController:findUserDetails')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'User Details Found', 200, userDetails)

                        resolve(userDetails)
                    }
                })
        })
    }// end finduserDetails

    let findHistory = (userDetails) => {
        return new Promise((resolve, reject) => {
            HistoryModel.find({ listCreatorUserId: userDetails.userId })
                .select()
                .lean()
                .sort({ 'storedTime': 'desc' })
                .exec((err, historyDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'historyController: findHistory', 10)
                        let apiResponse = response.generate(true, 'Failed To Find histpry Details of user', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(historyDetails)) {
                        logger.info('No History Details Found', 'historyController:findHistory')
                        let apiResponse = response.generate(true, 'No History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        console.log("history details of a user :", historyDetails);
                        let apiResponse = response.generate(false, 'History Details found of a user', 200, historyDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }

    findUserDetails(req, res)
        .then(findHistory)
        .then((resolve) => {

            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}


// function to delete a history object.

let deleteHistoryObj = (req, res) => {
    let findHistoryObj = () => {
        return new Promise((resolve, reject) => {
            HistoryModel.findOne({ historyId: req.params.historyId })
                .select()
                .lean()
                .exec((err, historyDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'historyController: findHistoryObj', 10)
                        let apiResponse = response.generate(true, 'Failed To Find history Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(historyDetails)) {
                        logger.info('No History Found', 'historyController: findHistoryObj')
                        let apiResponse = response.generate(true, 'No History Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(historyDetails);
                    }
                })
        })
    }

    let deleteHistory = (historyDetails) => {
        return new Promise((resolve, reject) => {
            HistoryModel.findOneAndRemove({ historyId: historyDetails.historyId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'historyController: deleteHistory', 10)
                    let apiResponse = response.generate(true, 'Failed To delete history obj', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No History Obj Found', 'historyController: deleteHistory')
                    let apiResponse = response.generate(true, 'No History Obj Found', 404, null)
                    reject(apiResponse)
                } else {
                    console.log("History Obj details here is:", historyDetails)
                    let apiResponse = response.generate(false, 'History obj deleted successfully', 200, result)
                    resolve(apiResponse)
                }
            });
        })
    }

    findHistoryObj(req, res)
        .then(deleteHistory)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}


module.exports = {
    addHistoryObjOnListDelete: addHistoryObjOnListDelete,
    addHistoryObjOnListEdit: addHistoryObjOnListEdit,
    addHistoryObjOnItemDelete: addHistoryObjOnItemDelete,
    addHistoryObjOnItemEdit: addHistoryObjOnItemEdit,
    addHistoryObjOnSubItemAdd: addHistoryObjOnSubItemAdd,
    addHistoryObjOnSubItemDelete: addHistoryObjOnSubItemDelete,
    addHistoryObjOnSubItemEdit: addHistoryObjOnSubItemEdit,
    getAllHistoryOfAUser: getAllHistoryOfAUser,
    deleteHistoryObj: deleteHistoryObj
}// end exports