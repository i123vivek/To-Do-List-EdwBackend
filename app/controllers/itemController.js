const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')

const ItemModel = mongoose.model('Item')
const ListModel = mongoose.model('List')
const UserModel = mongoose.model('User');
const HistoryModel = mongoose.model('History')

const notificationController = require('./notificationController')
const events = require('events');
const eventEmitter = new events.EventEmitter();


let getAllItemsOfList = (req, res) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ listId: req.params.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find list Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No list Found', 'itemController:findListDetails')
                        let apiResponse = response.generate(true, 'No list Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'list Details Found', 200, listDetails)
                        resolve(listDetails)
                    }
                })
        })
    } // end findlistDetails

    let findItems = (listDetails) => {
        return new Promise((resolve, reject) => {

            ItemModel.find({ listId: listDetails.listId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findItems', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'itemController:findItems')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'All Items Found of a list', 200, ItemDetails)
                        resolve(apiResponse)
                    }
                })
        })
    } // end findItems function.


    findListDetails(req, res)
        .then(findItems)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end getAllItemsOfList function 


let getItemDetails = (req, res) => {
    ItemModel.findOne({ itemId: req.params.itemId })
        .select()
        .lean()
        .exec((err, ItemDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: getItemDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ItemDetails)) {
                logger.info('No Item Found', 'itemController: getItemDetails')
                let apiResponse = response.generate(true, 'No Item Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Item Found', 200, ItemDetails)
                res.send(apiResponse)
            }
        })
} // end of getItemDetails Function

let deleteItem = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.params.itemId })
                .select()
                .lean()
                .exec((err, itemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(itemDetails)) {
                        logger.info('No Item Found', 'itemController: findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        if (req.body.historyToken == 'false') {

                            ListModel.find({ listId: itemDetails.listId })
                                .exec((err, listDetails) => {
                                    if (err) {
                                        console.log(err)
                                        logger.error(err.message, 'itemController: findList', 10)
                                        let apiResponse = response.generate(true, 'Db error', 500, null)
                                        reject(apiResponse)
                                    } else if (check.isEmpty(listDetails)) {
                                        logger.info('No List Found', 'itemController: findList')
                                    } else {

                                        let newHistoryObj = {
                                            actionPerformedOn: 'item-delete',
                                            objectToRestore: itemDetails,
                                            listId: itemDetails.listId,
                                            itemId: req.params.itemId,
                                            listCreatorUserId: listDetails.listCreatorId,
                                            storedTime: time.now()
                                        }

                                        historyController.addHistoryObjOnItemDelete(newHistoryObj);

                                    }
                                })

                        }

                        resolve(itemDetails)
                    }
                })
        })
    }

    let deleteItem = (itemDetails) => {
        return new Promise((resolve, reject) => {

            ItemModel.findOneAndRemove({ itemId: itemDetails.itemId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'itemController: deleteItem', 10)
                    let apiResponse = response.generate(true, 'Failed To delete item', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'itemController: deleteItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    console.log("Item details here is:", itemDetails)

                    let apiResponse = response.generate(false, 'item deleted successfully', 200, result)
                    eventEmitter.emit("item-deleted", itemDetails)
                    resolve(apiResponse)
                }
            });

        })
    }// end deleteItem function


    findItemDetails(req, res)
        .then(deleteItem)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


} // end of deleteItem Function 


eventEmitter.on("item-deleted", (itemDetail) => {

    ListModel.findOne({ listId: itemDetail.listId })
        .select()
        .exec((err, listDetail) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: eventEmitter.on -> item-deleted', 10)

            } else if (check.isEmpty(listDetail)) {
                logger.info('No List Found', 'itemController: eventEmitter.on -> item-deleted')

            } else {
                logger.info('List found', 'itemController: eventEmitter.on -> item-deleted');
                notificationController.createANewNotificationObjOnItemDelete(listDetail, itemDetail);
            }
        })

    //notificationController.createANewNotificationObjOnListDelete(ListDetails);

})


let updateItem = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.params.itemId })
                .select()
                .lean()
                .exec((err, itemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details due to Db error', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(itemDetails)) {
                        logger.info('No Item Found', 'itemController: findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        if (req.body.historyToken == 'false') {
                            ListModel.find({ listId: itemDetails.listId })
                                .exec((err, listDetails) => {
                                    if (err) {
                                        console.log(err)
                                        logger.error(err.message, 'itemController: findList', 10)
                                        let apiResponse = response.generate(true, 'Db error', 500, null)
                                        reject(apiResponse)
                                    } else if (check.isEmpty(listDetails)) {
                                        logger.info('No List Found', 'itemController: findList')
                                    } else {
                                        let newHistoryObj = {
                                            actionPerformedOn: 'item-edit',
                                            objectToRestore: itemDetails,
                                            listId: itemDetails.listId,
                                            itemId: req.params.itemId,
                                            listCreatorUserId: listDetails.listCreatorId,
                                            storedTime: time.now()
                                        }

                                        historyController.addHistoryObjOnItemEdit(newHistoryObj);

                                    }
                                })

                        }

                        resolve(itemDetails)
                    }
                })
        })
    } // end of finditemdetails function.

    let editItem = (itemDetails) => {
        return new Promise((resolve, reject) => {

            let options = req.body;
            options.itemModifiedOn = time.now()

            ItemModel.update({ itemId: itemDetails.itemId }, options).exec((err, result) => {

                if (err) {
                    console.log(err)
                    logger.error(err.message, 'itemController: editItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details due to db error', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'itemController: editItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'Item details Updated', 200, result)
                    eventEmitter.emit("item-edited", req.params.itemId);
                    resolve(apiResponse)
                }
            });
        })
    } // end updateItem function

    findItemDetails(req, res)
        .then(editItem)
        .then((resolve) => {

            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


} // end updateItemFunction 


eventEmitter.on("item-edited", (itemId) => {
    ItemModel.findOne({ itemId: itemId })
        .select()

        .exec((err, itemDetail) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: eventEmitter.on -> item-edited', 10)

            } else if (check.isEmpty(itemDetail)) {
                logger.info('No Item Found', 'itemController: eventEmitter.on -> item-edited')

            } else {
                logger.info('item found', 'itemController: eventEmitter.on -> item-edited');
                ListModel.findOne({ listId: itemDetail.listId })
                    .select()
                    .exec((err, listDetail) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'itemController: eventEmitter.on -> item-edited', 10)

                        } else if (check.isEmpty(listDetail)) {
                            logger.info('No List Found', 'itemController: eventEmitter.on -> item-edited')

                        } else {
                            logger.info('List found', 'itemController: eventEmitter.on -> item-edited');
                            notificationController.createANewNotificationObjOnItemEdit(listDetail, itemDetail);
                        }
                    })

                //notificationController.createANewNotificationObjOnListDelete(ListDetails);
            }
        })
})



let addItemToAList = (req, res) => {

    let validateItemInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.listId && req.body.itemName && req.body.itemCreatorId && req.body.itemCreatorName &&
                req.body.itemModifierId && req.body.itemModifierName) {
                resolve(req)
            } else {
                logger.error('Field Missing During Item Creation', 'itemController: addItem()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validate list input

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ listId: req.body.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details due to db error', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'itemController:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {


                        resolve(listDetails)
                    }
                })
        })
    } // end of findListDetails

    let addItem = () => {
        return new Promise((resolve, reject) => {

            if (req.body.historyToken == 'true') {
                let newItem = new ItemModel({
                    itemId: req.body.itemId,
                    listId: req.body.listId,
                    itemName: req.body.itemName,
                    itemCreatorId: req.body.itemCreatorId,
                    itemCreatorName: req.body.itemCreatorName,
                    itemModifierId: req.body.itemModifierId,
                    itemModifierName: req.body.itemModifierName,
                    itemDone: req.body.itemDone,
                    itemCreatedOn: req.body.itemCreatedOn,
                    itemModifiedOn: req.body.itemModifiedOn,
                })

                console.log(newItem);

                newItem.save((err, newItem) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: addItem', 10)
                        let apiResponse = response.generate(true, 'Failed to add new Item', 500, null)
                        reject(apiResponse)
                    } else {
                        let newItemObj = newItem.toObject();
                        //eventEmitter.emit("new-item-created", newItemObj);
                        resolve(newItemObj)
                    }
                })
            }
            else {
                let newItem = new ItemModel({
                    itemId: shortid.generate(),
                    listId: req.body.listId,
                    itemName: req.body.itemName,
                    itemCreatorId: req.body.itemCreatorId,
                    itemCreatorName: req.body.itemCreatorName,
                    itemModifierId: req.body.itemModifierId,
                    itemModifierName: req.body.itemModifierName,
                    itemDone: req.body.itemDone,
                    itemCreatedOn: time.now(),
                    itemModifiedOn: time.now(),
                })

                console.log(newItem);

                newItem.save((err, newItem) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: addItem', 10)
                        let apiResponse = response.generate(true, 'Failed to add new Item', 500, null)
                        reject(apiResponse)
                    } else {
                        let newItemObj = newItem.toObject();
                        eventEmitter.emit("new-item-created", newItemObj);
                        resolve(newItemObj)
                    }
                })

            }

        })
    } // end addItem function


    validateItemInput(req, res)
        .then(findListDetails)
        .then(addItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Item Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end addItemToAList Function 

eventEmitter.on("new-item-created", (itemDetail) => {
    ListModel.findOne({ listId: itemDetail.listId })
        .select()
        .exec((err, ListDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: eventEmitter.on -> item-created', 10)

            } else if (check.isEmpty(ListDetails)) {
                logger.info('No List Found', 'itemController: eventEmitter.on -> item-created')
            } else {
                logger.info('list found', 'itemController: eventEmitter.on -> item-created')

                //notificationController.createANewNotificationObjOnListEdit(ListDetails);

                ItemModel.findOne({ itemId: itemDetail.itemId })
                    .select()
                    .exec((error, itemDetails) => {
                        if (error) {
                            console.log(error);
                            logger.error(error.message, ' itemController: eventEmitter.on -> item-created', 10)
                        } else if (check.isEmpty(itemDetails)) {
                            logger.info('no item found', 'itemController: eventEmitter.on -> item-created')
                        } else {
                            logger.info('item found', 'itemController: eventEmitter.on -> item-created')

                            notificationController.createANewNotificationObjOnItemCreate(ListDetails, itemDetails)
                        }
                    })
            }
        })
})


let getSubItemDetails = (req, res) => {


    let findSubItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.params.itemId, "subItems.subItemId": req.params.subItemId })
                .lean()
                .exec((err, SubItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findSubItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Sub Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(SubItemDetails)) {
                        logger.info('No Sub Item Found', 'itemController: findSubItemDetails')
                        let apiResponse = response.generate(true, 'No Sub Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Sub Item Details Found', 200, SubItemDetails)
                        resolve(apiResponse)
                    }
                })

        })
    } // end findSubItemDetails function


    findSubItemDetails(req, res)
        //.then(findSubItemDetails)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end of getSubItemDetails Function .

let addSubItemToAnItem = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'itemController: findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        if (req.body.historyToken == 'false') {
                            ListModel.find({ listId: ItemDetails.listId })
                                .exec((err, listDetails) => {
                                    if (err) {
                                        console.log(err)
                                        logger.error(err.message, 'itemController: findList :- OnAddingSubitem', 10)
                                        let apiResponse = response.generate(true, 'Db error', 500, null)
                                        reject(apiResponse)
                                    } else if (check.isEmpty(listDetails)) {
                                        logger.info('No List Found', 'itemController: findList :- OnAddingSubitem')
                                    } else {
                                        console.log("list details here is:", listDetails)

                                        let newHistoryObj = {
                                            actionPerformedOn: 'subItem-add',
                                            objectToRestore: ItemDetails,
                                            listId: ItemDetails.listId,
                                            itemId: req.params.itemId,
                                            listCreatorUserId: listDetails.listCreatorId,
                                            storedTime: time.now()
                                        }
                                        historyController.addHistoryObjOnSubItemAdd(newHistoryObj);

                                    }
                                })

                        }

                        resolve(ItemDetails)
                    }
                })
        })
    } // end findItemdetails

    let updateItem = (ItemDetails) => {
        console.log(req.body)
        return new Promise((resolve, reject) => {

            if (req.body.historyToken == 'true') {
                let subOptions = {
                    subItemId: req.body.subItemId,
                    subItemName: req.body.subItemName,
                    subItemDone: req.body.subItemDone,
                    subItemCreatorId: req.body.subItemCreatorId,
                    subItemCreatorName: req.body.subItemCreatorName,
                    subItemModifierId: req.body.subItemModifierId,
                    subItemModifierName: req.body.subItemModifierName,
                    subItemDone: req.body.subItemDone,
                    subItemCreatedOn: req.body.subItemCreatedOn,
                    subItemModifiedOn: req.body.subItemModifiedOn,
                }
                let options = {
                    $push: {
                        subItems: {
                            $each: [subOptions]
                        }
                    }
                }
                options.itemModifiedOn = req.body.itemModifiedOn
                options.itemModifierId = req.body.subItemModifierId,
                    options.itemModifierName = req.body.subItemModifierName
                console.log(subOptions)
                ItemModel.update({ itemId: ItemDetails.itemId }, options).exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: updateSubItem', 10)
                        let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Adding', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Item Found', 'itemController: updateSubItem')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        let apiResponse = response.generate(false, 'Item details Updated : Sub Item Added', 200, subOptions)
                        //eventEmitter.emit("new-subItem-created", subOptions);
                        resolve(apiResponse)
                    }
                }); // end of Item model update
            }
            else {
                let subOptions = {
                    subItemId: shortid.generate(),
                    subItemName: req.body.subItemName,
                    subItemDone: req.body.subItemDone,
                    subItemCreatorId: req.body.subItemCreatorId,
                    subItemCreatorName: req.body.subItemCreatorName,
                    subItemModifierId: req.body.subItemModifierId,
                    subItemModifierName: req.body.subItemModifierName,
                    subItemDone: req.body.subItemDone,
                    subItemCreatedOn: time.now(),
                    subItemModifiedOn: time.now(),
                }
                let options = {
                    $push: {
                        subItems: {
                            $each: [subOptions]
                        }
                    }
                }
                options.itemModifiedOn = time.now()
                options.itemModifierId = req.body.subItemModifierId,
                    options.itemModifierName = req.body.subItemModifierName
                console.log(subOptions)
                ItemModel.update({ itemId: ItemDetails.itemId }, options).exec((err, result) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: updateSubItem', 10)
                        let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Adding', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Item Found', 'itemController: updateSubItem')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        let apiResponse = response.generate(false, 'Item details Updated : Sub Item Added', 200, subOptions)
                        eventEmitter.emit("new-subItem-created", subOptions);
                        resolve(apiResponse)
                    }
                }); // end of Item model update
            }

        })
    } // end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end of  addSubItemToAnItem Function 

eventEmitter.on("new-subItem-created", (subOptions) => {
    ItemModel.findOne({ 'subItems.subItemId': subOptions.subItemId })
        .select()

        .exec((err, itemDetail) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: eventEmitter.on -> new-subItem-added', 10)

            } else if (check.isEmpty(itemDetail)) {
                logger.info('No Item Found', 'itemController: eventEmitter.on -> new-subItem-added')

            } else {
                console.log("item details here is:", itemDetail)
                logger.info('item found', 'itemController: eventEmitter.on -> new-subItem-added');
                ListModel.findOne({ listId: itemDetail.listId })
                    .select()
                    .exec((err, listDetail) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'itemController: eventEmitter.on -> new-subItem-added', 10)

                        } else if (check.isEmpty(listDetail)) {
                            logger.info('No List Found', 'itemController: eventEmitter.on -> new-subItem-added')

                        } else {
                            logger.info('List found', 'itemController: eventEmitter.on -> new-subItem-added');
                            notificationController.createANewNotificationObjOnSubItemAdd(listDetail, itemDetail, subOptions);
                        }
                    })

                //notificationController.createANewNotificationObjOnListDelete(ListDetails);
            }
        })
})

let deleteSubItemOfAnItem = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'itemController:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        //let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        if (req.body.historyToken == 'false') {
                            ListModel.find({ listId: ItemDetails.listId })
                                .exec((err, listDetails) => {
                                    if (err) {
                                        console.log(err)
                                        logger.error(err.message, 'itemController: findList :- OnDeletingSubitem', 10)
                                        let apiResponse = response.generate(true, 'Db error', 500, null)
                                        reject(apiResponse)
                                    } else if (check.isEmpty(listDetails)) {
                                        logger.info('No List Found', 'itemController: findList :- OnDeletingSubitem')
                                    } else {
                                        console.log("list details here is:", listDetails)

                                        let newHistoryObj = {
                                            actionPerformedOn: 'subItem-delete',
                                            objectToRestore: ItemDetails,
                                            listId: ItemDetails.listId,
                                            itemId: req.params.itemId,
                                            listCreatorUserId: listDetails.listCreatorId,
                                            storedTime: time.now()
                                        }
                                        historyController.addHistoryObjOnSubItemDelete(newHistoryObj);
                                    }
                                })
                        }


                        resolve(ItemDetails)
                    }
                })
        })
    } // end findItemdetails

    let updateItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {

            let options = {
                $pull: {
                    subItems: {
                        subItemId: req.body.subItemId

                    }
                }

            }
            options.itemModifiedOn = time.now()
            options.itemModifierId = req.body.subItemModifierId,
                options.itemModifierName = req.body.subItemModifierName,
                ItemModel.update({ itemId: ItemDetails.itemId }, options, { save: true }).exec((err, result) => {

                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController:updateSubItem', 10)
                        let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Deleting', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Item Found', 'itemController:updateSubItem')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {

                        console.log("options here to delete subitem is", options.$pull.subItems.subItemId)

                        let apiResponse = response.generate(false, 'Item details Updated : Sub Item Deleted', 200, result)
                        eventEmitter.emit("subItem-deleted", options, ItemDetails);
                        resolve(apiResponse)
                    }
                }); // end Item model update

        })
    } // end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end of deleteSubItemOfAnItem  function

eventEmitter.on("subItem-deleted", (options, ItemDetails) => {
    //ItemModel.findOne({ 'subItems.subItemId' : subItemId })
    //.select()

    //.exec((err, itemDetail) => {
    // if (err) {
    //     console.log(err)
    //     logger.error(err.message, 'itemController: eventEmitter.on -> subItem-deleted', 10)

    // } else if (check.isEmpty(itemDetail)) {
    //     logger.info('No Item Found', 'itemController: eventEmitter.on -> subItem-deleted')

    // } else {
    //     console.log("item details here is:", itemDetail)
    //     logger.info('item found','itemController: eventEmitter.on -> subItem-deleted');
    ListModel.findOne({ listId: ItemDetails.listId })
        .select()
        .exec((err, listDetail) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: eventEmitter.on -> subItem-deleted', 10)

            } else if (check.isEmpty(listDetail)) {
                logger.info('No List Found', 'itemController: eventEmitter.on -> subItem-deleted')

            } else {
                logger.info('List found', 'itemController: eventEmitter.on -> subItem-deleted');
                notificationController.createANewNotificationObjOnSubItemDelete(listDetail, ItemDetails, options);
            }
        })

    //notificationController.createANewNotificationObjOnListDelete(ListDetails);
    //}
    //})
})


let editSubItem = (req, res) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ itemId: req.params.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'itemController: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'itemController:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        //let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        if (req.body.historyToken == 'false') {
                            ListModel.find({ listId: ItemDetails.listId })
                                .exec((err, listDetails) => {
                                    if (err) {
                                        console.log(err)
                                        logger.error(err.message, 'itemController: findList :- OnEditingSubitem', 10)
                                        let apiResponse = response.generate(true, 'Db error', 500, null)
                                        reject(apiResponse)
                                    } else if (check.isEmpty(listDetails)) {
                                        logger.info('No List Found', 'itemController: findList :- OnEditingSubitem')
                                    } else {
                                        console.log("list details here is:", listDetails)

                                        let newHistoryObj = {
                                            actionPerformedOn: 'subItem-edit',
                                            objectToRestore: ItemDetails,
                                            listId: ItemDetails.listId,
                                            itemId: req.params.itemId,
                                            listCreatorUserId: listDetails.listCreatorId,
                                            storedTime: time.now()
                                        }
                                        historyController.addHistoryObjOnSubItemEdit(newHistoryObj);
                                    }
                                })
                        }


                        resolve(ItemDetails)
                    }
                })
        })
    } // end of findItemdetails function.

    let updateItem = (ItemDetails) => {
        return new Promise((resolve, reject) => {
            // .$
            let options = {
                $set: {
                    "subItems.$.subItemName": req.body.subItemName,
                    "subItems.$.subItemModifierId": req.body.subItemModifierId,
                    "subItems.$.subItemModifierName": req.body.subItemModifierName,
                    "subItems.$.subItemDone": req.body.subItemDone,
                    "subItems.$.subItemModifiedOn": time.now(),

                }
            }
            options.itemModifiedOn = time.now()
            options.itemModifierId = req.body.subItemModifierId,
                options.itemModifierName = req.body.subItemModifierName,

                console.log("options here is:", options)

            ItemModel.updateOne({ itemId: ItemDetails.itemId, "subItems.subItemId": req.body.subItemId }, options).exec((err, result) => {

                if (err) {
                    console.log(err)
                    logger.error(err.message, 'itemController: updateItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Updating', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'itemController:updateItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Item details Updated : Sub Item Updated', 200, result)
                    eventEmitter.emit("subItem-edited", req.body.subItemId, req.body.subItemName);
                    resolve(apiResponse)


                }
            });

        })
    } // end updateItem function


    findItemDetails(req, res)
        .then(updateItem)
        .then((resolve) => {
            res.send(resolve)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

} // end of editSubItem Function 

eventEmitter.on("subItem-edited", (subItemId, subItemName) => {
    ItemModel.findOne({ 'subItems.subItemId': subItemId })
        .select()

        .exec((err, itemDetail) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'itemController: eventEmitter.on -> subItem-edited', 10)

            } else if (check.isEmpty(itemDetail)) {
                logger.info('No Item Found', 'itemController: eventEmitter.on -> subItem-edited')

            } else {
                console.log("item details here is:", itemDetail)
                logger.info('item found', 'itemController: eventEmitter.on -> subItem-edited');
                ListModel.findOne({ listId: itemDetail.listId })
                    .select()
                    .exec((err, listDetail) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'itemController: eventEmitter.on -> subItem-edited', 10)

                        } else if (check.isEmpty(listDetail)) {
                            logger.info('No List Found', 'itemController: eventEmitter.on -> subItem-edited')

                        } else {
                            logger.info('List found', 'itemController: eventEmitter.on -> subItem-edited');
                            notificationController.createANewNotificationObjOnSubItemEdit(listDetail, itemDetail, subItemId, subItemName);
                        }
                    })

                //notificationController.createANewNotificationObjOnListDelete(ListDetails);
            }
        })
})



module.exports = {

    getAllItemsOfList: getAllItemsOfList,
    getItemDetails: getItemDetails,
    deleteItem: deleteItem,
    updateItem: updateItem,
    addItemToAList: addItemToAList,

    getSubItemDetails: getSubItemDetails,
    addSubItemToAnItem: addSubItemToAnItem,
    deleteSubItemOfAnItem: deleteSubItemOfAnItem,
    editSubItem: editSubItem

} // end exports