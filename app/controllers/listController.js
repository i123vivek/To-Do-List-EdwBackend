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
const HistoryModel = mongoose.model('History')
const ItemModel = mongoose.model('Item');
const notificationController = require('./notificationController')
const historyController = require('./historyController');
const mailer = require("../libs/nodemailerLib");
const events = require('events');
const eventEmitter = new events.EventEmitter();
const fs = require("fs");


// function to  get all list of a user.
let getAllList = (req, res) => {

    let findUserDetails = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId })
                .select()
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: findUserDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No User Found', 'listController:findLists')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'User Details Found', 200, userDetails)

                        resolve(userDetails)
                    }
                })
        })
    }// end finduserDetails

    let findLists = (userDetails) => {
        return new Promise((resolve, reject) => {

            ListModel.find({ listCreatorId: userDetails.userId })
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: findLists', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'listController:findLists')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Lists Found and Listed', 200, ListDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }// end findLists
    findUserDetails(req, res)
        .then(findLists)
        .then((resolve) => {

            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getAllList Function .

let getAllOtherLists = (req, res) => {
    // let userIds = req.body.userId.split(',')
    // console.log(userIds)

    let findUserDetails = () => {
        return new Promise((resolve, reject) => {

            UserModel.find({ userId: req.body.userId })
                .select()
                .lean()
                .exec((err, userDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: findUserDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)) {
                        logger.info('No User Found', 'listController:findLists')
                        let apiResponse = response.generate(true, 'No User Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'User Details Found', 200, userDetails)
                        resolve(userDetails)
                    }
                })
        })
    }// end finduserDetails

    let findLists = (userDetails) => {
        return new Promise((resolve, reject) => {


            ListModel.find({ listCreatorId: userDetails.userId })
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: findLists', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'listController:findLists')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Lists Found ', 200, ListDetails)
                        resolve(apiResponse)
                    }
                })
        })
    }// end findLists


    findUserDetails(req, res)
        .then(findLists)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end getAllOtherLists Function .



let getListDetails = (req, res) => {
    ListModel.findOne({ listId: req.params.listId })
        .select()
        .lean()
        .exec((err, ListDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'listController: getListDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ListDetails)) {
                logger.info('No List Found', 'listController:getListDetails')
                let apiResponse = response.generate(true, 'No List Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List Found', 200, ListDetails)
                res.send(apiResponse)
            }
        })
}// end getListDetails Function.


let deleteList = (req, res) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ listId: req.params.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'listController:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        if (req.body.historyToken == 'false') {
                            let newHistoryObj = {
                                actionPerformedOn: 'list-delete',
                                objectToRestore: listDetails,
                                listId: req.params.listId,
                                listCreatorUserId: listDetails.listCreatorId,
                                storedTime: time.now()
                            }

                            historyController.addHistoryObjOnListDelete(newHistoryObj);
                        }

                        resolve(listDetails);

                    }
                })
        })
    }// end validate user input

    let deleteList = (listDetails) => {
        return new Promise((resolve, reject) => {

            ListModel.findOneAndRemove({ listId: listDetails.listId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'listController: deleteList', 10)
                    let apiResponse = response.generate(true, 'Failed To delete List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No List Found', 'listController: deleteList')
                    let apiResponse = response.generate(true, 'No List Found', 404, null)
                    reject(apiResponse)
                } else {
                    console.log("list details here is:", listDetails)

                    let apiResponse = response.generate(false, 'list deleted successfully', 200, result)
                    eventEmitter.emit("list-deleted", listDetails)
                    resolve(apiResponse)
                }
            });

        })
    }// end deleteList function


    findListDetails(req, res)
        .then(deleteList)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end deleteList Function .

eventEmitter.on("list-deleted", (listDetail) => {

    notificationController.createANewNotificationObjOnListDelete(listDetail);
})


let editList = (req, res) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ listId: req.params.listId })
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'listController:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        if (req.body.historyToken == 'false') {
                            let newHistoryObj = {
                                actionPerformedOn: 'list-edit',
                                objectToRestore: ListDetails,
                                listId: req.params.listId,
                                listCreatorUserId: ListDetails.listCreatorId,
                                storedTime: time.now()
                            }
                            historyController.addHistoryObjOnListEdit(newHistoryObj);
                        }
                        resolve(ListDetails);
                    }
                })
        })
    }// end of findListdetails

    let updateList = (ListDetails) => {
        return new Promise((resolve, reject) => {

            let options = req.body;
            options.listModifiedOn = time.now()

            ListModel.update({ listId: ListDetails.listId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'listController:updateList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update List details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No List Found', 'listController:updateList')
                    let apiResponse = response.generate(true, 'No List Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'List details Updated', 200, result)
                    eventEmitter.emit("list-edited", req.params.listId);
                    resolve(apiResponse)
                }
            });

        })
    }// end updateList function


    findListDetails(req, res)
        .then(updateList)
        .then((resolve) => {

            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end editList Function .

eventEmitter.on("list-edited", (listDetail) => {
    ListModel.findOne({ listId: listDetail })
        .select()

        .exec((err, ListDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'listController: eventEmitter.on -> list-edited', 10)
                // let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                // reject(apiResponse)
            } else if (check.isEmpty(ListDetails)) {
                logger.info('No List Found', 'listController: eventEmitter.on -> list-edited')
                // let apiResponse = response.generate(true, 'No List Found', 404, null)
                // reject(apiResponse)
            } else {
                logger.info('list found', 'listController: eventEmitter.on -> list-edited')
                // let apiResponse = response.generate(false, 'List Details Found', 200, ListDetails)
                // resolve(ListDetails)
                notificationController.createANewNotificationObjOnListEdit(ListDetails);
                //historyController.createANewHistoryObjOnListEdit(ListDetails);
            }
        })
})


let createList = (req, res) => {

    let validateListInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listName && req.body.listCreatorId && req.body.listCreatorName &&
                req.body.listModifierId && req.body.listModifierName) {
                resolve(req)
            } else {
                logger.error('Field Missing During List Creation', 'ListController: addList()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input 

    let addList = () => {
        return new Promise((resolve, reject) => {
            if (req.body.historyToken == 'true') {
                let newList = new ListModel({
                    listId: req.body.listId,
                    listName: req.body.listName,
                    listCreatorId: req.body.listCreatorId,
                    listCreatorName: req.body.listCreatorName,
                    listModifierId: req.body.listModifierId,
                    listModifierName: req.body.listModifierName,
                    listCreatedOn: req.body.listCreatedOn,
                    listModifiedOn: req.body.listModifiedOn,
                })

                console.log(newList)
                newList.save((err, newList) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: addList', 10)
                        let apiResponse = response.generate(true, 'Failed to create new List', 500, null)
                        reject(apiResponse)
                    } else {
                        let newListObj = newList.toObject();
                        //eventEmitter.emit("new-list-created", newListObj);
                        delete newListObj._id
                        delete newListObj.__v
                        resolve(newListObj)
                    }
                })
            }
            else {
                let newList = new ListModel({
                    listId: shortid.generate(),
                    listName: req.body.listName,
                    listCreatorId: req.body.listCreatorId,
                    listCreatorName: req.body.listCreatorName,
                    listModifierId: req.body.listModifierId,
                    listModifierName: req.body.listModifierName,
                    listCreatedOn: time.now(),
                    listModifiedOn: time.now(),
                })

                console.log(newList)
                newList.save((err, newList) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'listController: addList', 10)
                        let apiResponse = response.generate(true, 'Failed to create new List', 500, null)
                        reject(apiResponse)
                    } else {
                        let newListObj = newList.toObject();
                        eventEmitter.emit("new-list-created", newListObj);
                        delete newListObj._id
                        delete newListObj.__v
                        resolve(newListObj)
                    }
                })
            }




        })
    }// end addList function


    validateListInput(req, res)
        .then(addList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'List Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end of createList Function. 


eventEmitter.on("new-list-created", (listData) => {

    notificationController.createNewNotificationListObj(listData)

})





module.exports = {
    getAllList: getAllList,
    getAllOtherLists: getAllOtherLists,
    getListDetails: getListDetails,
    deleteList: deleteList,
    editList: editList,
    createList: createList

}// end exports