const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const listController = require("./../../app/controllers/listController");
const itemController = require("./../../app/controllers/itemController");
const friendController = require("./../../app/controllers/friendController");
const notificationController = require("./../../app/controllers/notificationController");
const historyController = require("../controllers/historyController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;

    // api for user...........

    app.post(`${baseUrl}/users/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/users/login`, userController.loginFunction);

    app.get(`${baseUrl}/users/view/all`, auth.isAuthorized, userController.getAllUser);

    app.get(`${baseUrl}/users/:userId/details`, auth.isAuthorized, userController.getSingleUser);

    app.get(`${baseUrl}/users/:email/user/details`, auth.isAuthorized, userController.getSingleUserDetailByEmail);

    app.post(`${baseUrl}/users/logout`,auth.isAuthorized, userController.logout);

    app.post(`${baseUrl}/users/forgot/password`, userController.forgotPassword);

    app.post(`${baseUrl}/users/reset/:token`,userController.resetPassword);


    // api for mark notification as seen...

    app.get(`${baseUrl}/notifications/mark/notification/seen`, auth.isAuthorized, notificationController.markNotificationAsSeen);

    //api for  sending and receiving friend request............

    app.get(`${baseUrl}/friends/view/:userId/friend/request/sent`, auth.isAuthorized, friendController.getAllRequestSent);

    app.get(`${baseUrl}/friends/view/:userId/friend/request/recieved`, auth.isAuthorized, friendController.getAllRequestRecieved);

    app.get(`${baseUrl}/friends/view/:userId/all/friend`, auth.isAuthorized, friendController.getAllFriend);

    app.post(`${baseUrl}/friends/send/friend/request`, auth.isAuthorized, friendController.sendFriendRequest);

    app.post(`${baseUrl}/friends/accept/friend/request`, auth.isAuthorized, friendController.acceptFriendRequest);

    //...
    app.post(`${baseUrl}/friends/reject/friend/request`, auth.isAuthorized, friendController.rejectFriendRequest);

    app.post(`${baseUrl}/friends/cancel/friend/request`, auth.isAuthorized, friendController.cancelFriendRequest);

    app.post(`${baseUrl}/friends/unfriend/user`, auth.isAuthorized, friendController.unfriendFunction);
    

    // api for list .............

    app.post(`${baseUrl}/lists/createList`, auth.isAuthorized, listController.createList);

    app.put(`${baseUrl}/lists/:listId/editList`, auth.isAuthorized, listController.editList)

    app.post(`${baseUrl}/lists/:listId/delete`, auth.isAuthorized, listController.deleteList)

    app.get(`${baseUrl}/lists/view/all/:userId/lists`, auth.isAuthorized, listController.getAllList)

    // ...
    app.post(`${baseUrl}/lists/view/all/other/lists`, auth.isAuthorized, listController.getAllOtherLists)

    app.get(`${baseUrl}/lists/:listId/details`, auth.isAuthorized, listController.getListDetails)

    // api for item ................

    app.post(`${baseUrl}/items/add/item`, auth.isAuthorized, itemController.addItemToAList);

    app.put(`${baseUrl}/items/:itemId/update/item`, auth.isAuthorized, itemController.updateItem);

    app.post(`${baseUrl}/items/:itemId/delete`, auth.isAuthorized, itemController.deleteItem);

    app.get(`${baseUrl}/items/view/all/:listId/items`, auth.isAuthorized, itemController.getAllItemsOfList);

    app.get(`${baseUrl}/items/:itemId/details`, auth.isAuthorized, itemController.getItemDetails);

    // api for subItem ................

    app.put(`${baseUrl}/subItems/:itemId/add/subItem`, auth.isAuthorized, itemController.addSubItemToAnItem);

    app.put(`${baseUrl}/subItems/:itemId/edit/subItem`, auth.isAuthorized, itemController.editSubItem);

    app.put(`${baseUrl}/subItems/:itemId/delete/subItem`, auth.isAuthorized, itemController.deleteSubItemOfAnItem);


    // isk jagha p getItemdetails api v use kr sakte h.
    app.get(`${baseUrl}/subItems/:itemId/:subItemId/details`, auth.isAuthorized, itemController.getSubItemDetails);


    // api for history...........

    // app.post(`${baseUrl}/history/addHistory`, auth.isAuthorized, historyController.addHistoryFunction);

    // app.post(`${baseUrl}/history/deleteHistory`, auth.isAuthorized, historyController.deleteHistoryFunction);

    app.get(`${baseUrl}/history/:listId/getHistory`, auth.isAuthorized, historyController.getHistoryDetailsOfAList);

    app.get(`${baseUrl}/history/:itemId/getHistory`, auth.isAuthorized, historyController.getHistoryDetailsOfAnItem);
    
}