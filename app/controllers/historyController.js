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

let getHistoryDetailsOfAList =(req, res) =>{
    let validateListInput =() =>{
        return new Promise((resolve, reject) =>{
            if (req.params.listId) {
                resolve(req)
            } else{
                logger.error('Field Missing During History Creation', 'historyController: validateListInput()',5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validate list input .

    let getHistoryDetails = () =>{
        return new Promise((resolve,reject) =>{
            HistoryModel.find({listId: req.params.listId})
                .sort({"storedTime": 1})
                .lean()
                .exec((err,historyData) =>{
                    if(err){
                        console.log(err)
                        logger.error(err.message, 'historyController: getHistoryDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find history details due to db error', 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(historyData)){
                        logger.info('No History data Found', 'historyController: getHistoryDetails')
                        let apiResponse = response.generate(true, 'No history data found for this list', 404, null)
                        reject(apiResponse)
                    } else{
                        console.log("history details found", historyData)
                        //let apiResponse = response.generate(false, 'history data found for the list', 200, null)
                        resolve(historyData)
                    }
                })
        })
    }

    validateListInput(req, res)
        .then(getHistoryDetails)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'History data found', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}

let getHistoryDetailsOfAnItem =(req, res) =>{
    let validateItemInput =() =>{
        return new Promise((resolve, reject) =>{
            if (req.params.itemId) {
                resolve(req)
            } else{
                logger.error('Field Missing During History Creation', 'historyController: validateItemInput()',5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validate item input .

    let getHistoryDetails = () =>{
        return new Promise((resolve,reject) =>{
            HistoryModel.find({itemId: req.params.itemId})
                .sort({"storedTime": 1})
                .lean()
                .exec((err,historyData) =>{
                    if(err){
                        console.log(err)
                        logger.error(err.message, 'historyController: getHistoryDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find history details due to db error', 500, null)
                        reject(apiResponse)
                    } else if(check.isEmpty(historyData)){
                        logger.info('No History data Found', 'historyController: getHistoryDetails')
                        let apiResponse = response.generate(true, 'No history data found for this list', 404, null)
                        reject(apiResponse)
                    } else{
                        console.log("history details found", historyData)
                        //let apiResponse = response.generate(false, 'history data found for the list', 200, null)
                        resolve(historyData)
                    }
                })
        })
    }

    validateItemInput(req, res)
        .then(getHistoryDetails)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'History data found', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}

module.exports = {
    getHistoryDetailsOfAList: getHistoryDetailsOfAList,
    getHistoryDetailsOfAnItem: getHistoryDetailsOfAnItem
}// end exports