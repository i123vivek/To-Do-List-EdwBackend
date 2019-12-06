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

    // params: firstName, lastName, email, mobileNumber, password, country.
    app.post(`${baseUrl}/users/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {number} mobileNumber mobileNumber of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} country country of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "userId": "hZ53_DA0V",
                "firstName": "raju",
                "lastName": "kumar",
                "email": "raju@gmail.com",
                "mobileNumber": 9431562056,
                "country": "india",
                "countryCode": 91,
                "createdOn": "2019-12-06T11:58:01.000Z",
                "resetPasswordToken": "",
                "resetPasswordExpires": "",
                "_id": "5dea424963d5441b3da9ff1e",
                "friends": [],
                "friendRequestRecieved": [],
                "friendRequestSent": [],
                "__v": 0
            }
        }
    */

     // params: email, password.
    app.post(`${baseUrl}/users/login`, userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjU0UEVtRjRhbSIsImlhdCI6MTU3NTYzMzY5ODcyMCwiZXhwIjoxNTc1NzIwMDk4NzIwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZC1wMi1Uby1Eby1MaXN0IiwiZGF0YSI6eyJ1c2VySWQiOiJoWjUzX0RBMFYiLCJmaXJzdE5hbWUiOiJyYWp1IiwibGFzdE5hbWUiOiJrdW1hciIsImVtYWlsIjoicmFqdUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjk0MzE1NjIwNTYsImNvdW50cnkiOiJpbmRpYSIsImNvdW50cnlDb2RlIjo5MSwicmVzZXRQYXNzd29yZFRva2VuIjoiIiwicmVzZXRQYXNzd29yZEV4cGlyZXMiOiIiLCJmcmllbmRzIjpbXSwiZnJpZW5kUmVxdWVzdFJlY2lldmVkIjpbXSwiZnJpZW5kUmVxdWVzdFNlbnQiOltdfX0.NV_eraiBCdb6rEeIot-E89_Okf6E-yAL8zi21mdcfh8",
                "userDetails": {
                    "userId": "hZ53_DA0V",
                    "firstName": "raju",
                    "lastName": "kumar",
                    "email": "raju@gmail.com",
                    "mobileNumber": 9431562056,
                    "country": "india",
                    "countryCode": 91,
                    "resetPasswordToken": "",
                    "resetPasswordExpires": "",
                    "friends": [],
                    "friendRequestRecieved": [],
                    "friendRequestSent": []
                }
            }
        }
    */

    //params: authToken
    app.get(`${baseUrl}/users/view/all`, auth.isAuthorized, userController.getAllUser);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/view/all api for getting all user details.
     *
     * @apiParam {string} authToken authToken of the user. (query params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All User Details Found",
            "status": 200,
            "data": [
                {
                    "userId": "Iq0YavfPA",
                    "firstName": "satyam",
                    "lastName": "tiwary",
                    "password": "$2a$10$KKKzBsRo32ebC4.f4tlBUuWVRui/8o1MZl04D6BdlspKhR5g02iGC",
                    "email": "satyam@gmail.com",
                    "mobileNumber": 9432583058,
                    "country": "india",
                    "countryCode": 91,
                    "createdOn": "2019-11-17T10:09:48.000Z",
                    "resetPasswordToken": "",
                    "resetPasswordExpires": "",
                    "friends": [
                        {
                            "friendId": "j-3YxGmZ6",
                            "friendName": "rohit kumar",
                            "_id": "5dea3047dfa8bc0fba4cde98"
                        },
                        {
                            "friendId": "69KyiHJOn",
                            "friendName": "satu kr",
                            "_id": "5dea3441bf5a1413c1232f15"
                        }
                    ],
                    "friendRequestRecieved": [],
                    "friendRequestSent": []
                },
                {
                    "userId": "69KyiHJOn",
                    "firstName": "satu",
                    "lastName": "kr",
                    "password": "$2a$10$6caj3w/RhUSJi1LuMd7bL.zj81GnwqI9Dvfc/Gbzp8y3x2OK3aoIy",
                    "email": "satu@gmail.com",
                    "mobileNumber": 9431582057,
                    "country": "india",
                    "countryCode": 91,
                    "createdOn": "2019-11-27T09:32:07.000Z",
                    "resetPasswordToken": "",
                    "resetPasswordExpires": "",
                    "friends": [
                        {
                            "friendId": "j-3YxGmZ6",
                            "friendName": "rohit kumar",
                            "_id": "5dea2bc3dfa8bc0fba4cde8e"
                        },
                        {
                            "friendId": "Iq0YavfPA",
                            "friendName": "satyam tiwary",
                            "_id": "5dea3441bf5a1413c1232f14"
                        }
                    ],
                    "friendRequestRecieved": [],
                    "friendRequestSent": []
                },
                {
                    "userId": "j-3YxGmZ6",
                    "firstName": "rohit",
                    "lastName": "kumar",
                    "password": "$2a$10$.qkJIjNLOB7O0AbRP8m7N.bjnj9PWMhsI0iHlVC3DmILfKrLqFu/a",
                    "email": "rohit@gmail.com",
                    "mobileNumber": 9431582068,
                    "country": "india",
                    "countryCode": 91,
                    "createdOn": "2019-12-06T10:17:01.000Z",
                    "resetPasswordToken": "",
                    "resetPasswordExpires": "",
                    "friends": [
                        {
                            "friendId": "69KyiHJOn",
                            "friendName": "satu kr",
                            "_id": "5dea2bbedfa8bc0fba4cde8b"
                        },
                        {
                            "friendId": "Iq0YavfPA",
                            "friendName": "satyam tiwary",
                            "_id": "5dea3047dfa8bc0fba4cde97"
                        }
                    ],
                    "friendRequestRecieved": [],
                    "friendRequestSent": []
                },
                {
                    "userId": "hZ53_DA0V",
                    "firstName": "raju",
                    "lastName": "kumar",
                    "password": "$2a$10$BLhyqr8RIr6hTwBb1TqLu..e/OfWtLE9LGAmKZxA9g3XmSvF9JOeK",
                    "email": "raju@gmail.com",
                    "mobileNumber": 9431562056,
                    "country": "india",
                    "countryCode": 91,
                    "createdOn": "2019-12-06T11:58:01.000Z",
                    "resetPasswordToken": "",
                    "resetPasswordExpires": "",
                    "friends": [],
                    "friendRequestRecieved": [],
                    "friendRequestSent": []
                }
            ]
        }
    */

    // params: authToken, userId
    app.get(`${baseUrl}/users/:userId/details`, auth.isAuthorized, userController.getSingleUser);

    /**
     * 
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:userId/details to get details of a user .
     * 
     * @apiParam {string} userId userId of the user. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "User Details Found",
            "status": 200,
            "data": {
                "userId": "j-3YxGmZ6",
                "firstName": "rohit",
                "lastName": "kumar",
                "email": "rohit@gmail.com",
                "mobileNumber": 9431582068,
                "country": "india",
                "countryCode": 91,
                "createdOn": "2019-12-06T10:17:01.000Z",
                "resetPasswordToken": "",
                "resetPasswordExpires": "",
                "friends": [
                    {
                        "friendId": "69KyiHJOn",
                        "friendName": "satu kr",
                        "_id": "5dea2bbedfa8bc0fba4cde8b"
                    },
                    {
                        "friendId": "69KyiHJOn",
                        "friendName": "satu kr",
                        "_id": "5dea2bc3dfa8bc0fba4cde8d"
                    },
                    {
                        "friendId": "Iq0YavfPA",
                        "friendName": "satyam tiwary",
                        "_id": "5dea3047dfa8bc0fba4cde97"
                    }
                ],
                "friendRequestRecieved": [],
                "friendRequestSent": []
            }
        }
     *   
     */

    //app.get(`${baseUrl}/users/:email/user/details`, auth.isAuthorized, userController.getSingleUserDetailByEmail);


    //params: authToken, userId 
    app.post(`${baseUrl}/users/logout`, auth.isAuthorized, userController.logout);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */


    //for forgot password
    // params: email.
    app.post(`${baseUrl}/users/forgot/password`, userController.forgotPassword);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgot/password to recover forgot password.
     * 
     * @apiParam {string} email email of the user. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     *   {
            "error": false,
            "message": "mail-sent successfully",
            "status": 200,
            "data": {
                "userId": "69KyiHJOn",
                "firstName": "satu",
                "lastName": "kr",
                "password": "$2a$10$6caj3w/RhUSJi1LuMd7bL.zj81GnwqI9Dvfc/Gbzp8y3x2OK3aoIy",
                "email": "satu@gmail.com",
                "mobileNumber": 9431582057,
                "country": "india",
                "countryCode": 91,
                "createdOn": "2019-11-27T09:32:07.000Z",
                "resetPasswordToken": "bFRPO_sk2",
                "resetPasswordExpires": "1575641552069",
                "_id": "5dde429752cef90884b2c5a6",
                "friends": [
                    {
                        "friendId": "j-3YxGmZ6",
                        "friendName": "rohit kumar",
                        "_id": "5dea2bbedfa8bc0fba4cde8c"
                    },
                    {
                        "friendId": "j-3YxGmZ6",
                        "friendName": "rohit kumar",
                        "_id": "5dea2bc3dfa8bc0fba4cde8e"
                    },
                    {
                        "friendId": "Iq0YavfPA",
                        "friendName": "satyam tiwary",
                        "_id": "5dea3441bf5a1413c1232f14"
                    }
                ],
                "friendRequestRecieved": [],
                "friendRequestSent": [],
                "__v": 0
            }
        }
     * 
    */

    // params: newpassword.
    app.post(`${baseUrl}/users/reset/:token`, userController.resetPassword);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/reset/:token to reset new password.
     * 
     * @apiParam {string} newPassword newPassword of the user. (body params) (required).
     * @apiParam {string} token resetPasswordToken generated in forgot password. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "mail sent successfully after reset-password.",
            "status": 200,
            "data": null
        }
     * 
    */


    // api for mark notification as seen...

    //params: notificationId,authToken
    app.get(`${baseUrl}/notifications/mark/notification/seen`, auth.isAuthorized, notificationController.markNotificationAsSeen);

    /**
     * 
     * 
     * @apiGroup notifications
     * @apiVersion  1.0.0
     * @api {get} /api/v1/notifications/mark/notification/seen to mark notification as seen.
     *
     * @apiParam {string} notificationId notificationId of the user. (Send notificationId as query parameter) (required)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Marked As Seen",
            "status": 200,
            "data": {
                "notificationId": "Y3GEnkynj",
                "notificationStatus": "seen",
                "userEmailToSendNotification": [
                    "satu@gmail.com",
                    "raju@gmail.com"
                ],
                "_id": "5d051e8955c1e60d37edeeb1",
                "notificationListId": "Ms_VDaYOU",
                "notificationMessage": "hey a list is edited with list Details [object Object]",
                "notificationPurpose": "list-edit",
                "__v": 0
            }
        }
     * 
     */

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

    //params: listName,listCreatorId,listCreatorName,listModifierId,listModifierName,historyToken,authToken.
    app.post(`${baseUrl}/lists/createList`, auth.isAuthorized, listController.createList);

    /**
     * 
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {post} /api/v1/lists/createList to create new list.
     * 
     * @apiParam {string} listName listName of list. (body params) (required).
     * @apiParam {string} listCreatorId listCreatorId of the list. (body params) (required).
     * @apiParam {string} listCreatorName listCreatorName of the list. (body params) (required).
     * @apiParam {string} listModifierId listModifierId of the list. (body params) (required).
     * @apiParam {string} listModifierName listModifierName of the list. (body params) (required).
     * @apiParam {string} historyToken historyToken of the list. (body params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "List Created",
            "status": 200,
            "data": {
                "listId": "ZWngN1csl",
                "listName": "list test1",
                "listCreatorId": "hZ53_DA0V",
                "listCreatorName": "raju kumar",
                "listModifierId": "hZ53_DA0V",
                "listModifierName": "raju kumar",
                "listCreatedOn": "2019-12-06T13:28:04.000Z",
                "listModifiedOn": "2019-12-06T13:28:04.000Z"
            }
        }
     * 
     */


    //params: listId,authToken,historyToken.
    app.put(`${baseUrl}/lists/:listId/editList`, auth.isAuthorized, listController.editList)

    /**
     * 
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {put} /api/v1/lists/:listId/editList to edit a list .
     * 
     * @apiParam {string} listId listId of the list. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} historyToken historyToken of the list. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "List details Updated",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     */


    //params: listId,authToken,historyToken.
    app.post(`${baseUrl}/lists/:listId/delete`, auth.isAuthorized, listController.deleteList)

    /**
     * 
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {put} /api/v1/lists/:listId/delete to delete a list .
     * 
     * @apiParam {string} listId listId of the list. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} historyToken historyToken of the list. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "list deleted successfully",
            "status": 200,
            "data": {
                "listId": "HCn9nlL3r",
                "listName": "list test3",
                "listCreatorId": "hZ53_DA0V",
                "listCreatorName": "raju kumar",
                "listModifierId": "hZ53_DA0V",
                "listModifierName": "raju kumar",
                "listCreatedOn": "2019-12-06T13:50:01.000Z",
                "listModifiedOn": "2019-12-06T13:50:01.000Z",
                "_id": "5dea5c8963d5441b3da9ff26",
                "__v": 0
            }
        }
     * 
     */



    //params: userId,authToken.
    app.get(`${baseUrl}/lists/view/all/:userId/lists`, auth.isAuthorized, listController.getAllList)

    /**
     * 
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/view/all/:userId/lists to get all list of a user .
     * 
     * @apiParam {string} userId userId of the user. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Lists Found and Listed",
            "status": 200,
            "data": [
                {
                    "_id": "5dea576463d5441b3da9ff20",
                    "listId": "ZWngN1csl",
                    "listName": "list edit4",
                    "listCreatorId": "hZ53_DA0V",
                    "listCreatorName": "raju kumar",
                    "listModifierId": "hZ53_DA0V",
                    "listModifierName": "raju kumar",
                    "listCreatedOn": "2019-12-06T13:28:04.000Z",
                    "listModifiedOn": "2019-12-06T14:15:30.000Z",
                    "__v": 0
                },
                {
                    "_id": "5dea5c8063d5441b3da9ff24",
                    "listId": "byFNG87CN",
                    "listName": "list test2",
                    "listCreatorId": "hZ53_DA0V",
                    "listCreatorName": "raju kumar",
                    "listModifierId": "hZ53_DA0V",
                    "listModifierName": "raju kumar",
                    "listCreatedOn": "2019-12-06T13:49:52.000Z",
                    "listModifiedOn": "2019-12-06T13:49:52.000Z",
                    "__v": 0
                }
            ]
        }
     *   
     */

    // ...
    app.post(`${baseUrl}/lists/view/all/other/lists`, auth.isAuthorized, listController.getAllOtherLists)

    //params: listId,authToken,

    app.get(`${baseUrl}/lists/:listId/details`, auth.isAuthorized, listController.getListDetails)

    /**
     * 
     * @apiGroup lists
     * @apiVersion  1.0.0
     * @api {get} /api/v1/lists/:listId/details to get list details of a list .
     * 
     * @apiParam {string} listId listId of a list. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "List Found",
            "status": 200,
            "data": {
                "_id": "5dea576463d5441b3da9ff20",
                "listId": "ZWngN1csl",
                "listName": "list edit4",
                "listCreatorId": "hZ53_DA0V",
                "listCreatorName": "raju kumar",
                "listModifierId": "hZ53_DA0V",
                "listModifierName": "raju kumar",
                "listCreatedOn": "2019-12-06T13:28:04.000Z",
                "listModifiedOn": "2019-12-06T14:15:30.000Z",
                "__v": 0
            }
        }
     *   
     */

    // api for item ................

    // params: listId,itemName,itemCreatorId,itemCreatorName,itemModifierId,itemModifierName,historyToken,itemDone,authToken.
    app.post(`${baseUrl}/items/add/item`, auth.isAuthorized, itemController.addItemToAList);

    /**
     * 
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {post} /api/v1/items/add/item to add new item to a list.
     * 
     * @apiParam {string} listId listId of list. (body params) (required).
     * @apiParam {string} itemName itemName of the item. (body params) (required).
     * @apiParam {string} itemCreatorId itemCreatorId of the item. (body params) (required).
     * @apiParam {string} itemCreatorName itemCreatorName of the item. (body params) (required).
     * @apiParam {string} itemModifierId itemModifierId of the item. (body params) (required).
     * @apiParam {string} itemModifierName itemModifierName of the item. (body params) (required).
     * @apiParam {string} historyToken historyToken of the item. (body params) (required).
     * @apiParam {string} itemDone itemDone of the item. (body params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "Item Created",
            "status": 200,
            "data": {
                "itemId": "RvaKWHwVd",
                "listId": "ZWngN1csl",
                "itemName": "itemtest1",
                "itemCreatorId": "hZ53_DA0V",
                "itemCreatorName": "raju kumar",
                "itemCreatedOn": "2019-12-06T15:40:30.000Z",
                "itemModifiedOn": "2019-12-06T15:40:30.000Z",
                "itemModifierId": "hZ53_DA0V",
                "itemModifierName": "raju kumar",
                "itemDone": "no",
                "_id": "5dea766eef5b5b243a643282",
                "subItems": [],
                "__v": 0
            }
        }
     * 
     */


    // params: itemId,authToken,historyToken
    app.put(`${baseUrl}/items/:itemId/update/item`, auth.isAuthorized, itemController.updateItem);

    /**
     * 
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {put} /api/v1/items/:itemId/update/item to edit an item .
     * 
     * @apiParam {string} itemId itemId of the item. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} historyToken historyToken of the item. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Item details Updated",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     */

    // params: itemId,authToken,historyToken
    app.post(`${baseUrl}/items/:itemId/delete`, auth.isAuthorized, itemController.deleteItem);

    /**
     * 
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {post} /api/v1/items/:itemId/delete to delete an item of a list .
     * 
     * @apiParam {string} itemId itemId of the item. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} historyToken historyToken of the item. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "item deleted successfully",
            "status": 200,
            "data": {
                "itemId": "HsXhnXiVC",
                "listId": "ZWngN1csl",
                "itemName": "itemtest3",
                "itemCreatorId": "hZ53_DA0V",
                "itemCreatorName": "raju kumar",
                "itemCreatedOn": "2019-12-06T16:14:44.000Z",
                "itemModifiedOn": "2019-12-06T16:14:44.000Z",
                "itemModifierId": "hZ53_DA0V",
                "itemModifierName": "raju kumar",
                "itemDone": "no",
                "_id": "5dea7e741653fe2991f7d576",
                "subItems": [],
                "__v": 0
            }
        }
     * 
     */


    // params: listId,authToken
    app.get(`${baseUrl}/items/view/all/:listId/items`, auth.isAuthorized, itemController.getAllItemsOfList);

    /**
     * 
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {get} /api/v1/items/view/all/:listId/items to get all item of a list .
     * 
     * @apiParam {string} listId listId of the list. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "All Items Found of a list",
            "status": 200,
            "data": [
                {
                    "_id": "5dea766eef5b5b243a643282",
                    "itemId": "RvaKWHwVd",
                    "listId": "ZWngN1csl",
                    "itemName": "itemedit1",
                    "itemCreatorId": "hZ53_DA0V",
                    "itemCreatorName": "raju kumar",
                    "itemCreatedOn": "2019-12-06T15:40:30.000Z",
                    "itemModifiedOn": "2019-12-06T15:54:31.000Z",
                    "itemModifierId": "hZ53_DA0V",
                    "itemModifierName": "raju kumar",
                    "itemDone": "no",
                    "subItems": [],
                    "__v": 0
                },
                {
                    "_id": "5dea7e6a1653fe2991f7d574",
                    "itemId": "dvE8v3pNN",
                    "listId": "ZWngN1csl",
                    "itemName": "itemtest2",
                    "itemCreatorId": "hZ53_DA0V",
                    "itemCreatorName": "raju kumar",
                    "itemCreatedOn": "2019-12-06T16:14:34.000Z",
                    "itemModifiedOn": "2019-12-06T16:14:34.000Z",
                    "itemModifierId": "hZ53_DA0V",
                    "itemModifierName": "raju kumar",
                    "itemDone": "no",
                    "subItems": [],
                    "__v": 0
                }
            ]
        }
     * 
     */


    //params: itemId,authToken
    app.get(`${baseUrl}/items/:itemId/details`, auth.isAuthorized, itemController.getItemDetails);

    /**
     * 
     * @apiGroup items
     * @apiVersion  1.0.0
     * @api {get} /api/v1/items/:itemId/details to get details  of an item .
     * 
     * @apiParam {string} itemId itemId of the item. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Item Found",
            "status": 200,
            "data": {
                "_id": "5dea7e6a1653fe2991f7d574",
                "itemId": "dvE8v3pNN",
                "listId": "ZWngN1csl",
                "itemName": "itemtest2",
                "itemCreatorId": "hZ53_DA0V",
                "itemCreatorName": "raju kumar",
                "itemCreatedOn": "2019-12-06T16:14:34.000Z",
                "itemModifiedOn": "2019-12-06T16:14:34.000Z",
                "itemModifierId": "hZ53_DA0V",
                "itemModifierName": "raju kumar",
                "itemDone": "no",
                "subItems": [],
                "__v": 0
            }
        }
     * 
     */

    // api for subItem ................


    // params: historyToken,subItemName,subItemDone,subItemCreatorId,subItemCreatorName,subItemModifierId,subItemModifierName,itemId,authToken
    app.put(`${baseUrl}/subItems/:itemId/add/subItem`, auth.isAuthorized, itemController.addSubItemToAnItem);

    /**
     * 
     * @apiGroup subItems
     * @apiVersion  1.0.0
     * @api {put} /api/v1/subItems/:itemId/add/subItem to add new subItem to an item.
     * 
     * @apiParam {string} itemId itemId of an item. (query params) (required).
     * @apiParam {string} subItemName subItemName of the subItem. (body params) (required).
     * @apiParam {string} subItemDone subItemDone of the subItem. (body params) (required).
     * @apiParam {string} subItemCreatorId subItemCreatorId of the subItem. (body params) (required).
     * @apiParam {string} subItemCreatorName subItemCreatorName of the subItem. (body params) (required).
     * @apiParam {string} subItemModifierId subItemModifierId of the subItem. (body params) (required).
     * @apiParam {string} subItemModifierName subItemModifierName of the subItem. (body params) (required).
     * @apiParam {string} historyToken historyToken of the subItem. (body params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "Item details Updated : Sub Item Added",
            "status": 200,
            "data": {
                "subItemId": "rzyhukMEg",
                "subItemName": "subitemtest1",
                "subItemDone": "yes",
                "subItemCreatorId": "hZ53_DA0V",
                "subItemCreatorName": "raju kumar",
                "subItemModifierId": "hZ53_DA0V",
                "subItemModifierName": "raju kumar",
                "subItemCreatedOn": "2019-12-06T16:32:30Z",
                "subItemModifiedOn": "2019-12-06T16:32:30Z"
            }
        }
     * 
     */


    //params: itemId,authToken,subItemId,historyToken.
    app.put(`${baseUrl}/subItems/:itemId/edit/subItem`, auth.isAuthorized, itemController.editSubItem);

    /**
     * 
     * @apiGroup subItems
     * @apiVersion  1.0.0
     * @api {put} /api/v1/subItems/:itemId/edit/subItem to edit a subItem of an item .
     * 
     * @apiParam {string} itemId itemId of the item. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} subItemId subItemId of the subItem. (body params) (required).
     * @apiParam {string} historyToken historyToken of the subItem. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Item details Updated : Sub Item Updated",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     */


    //params: itemId,authToken,subItemId,historyToken.
    app.put(`${baseUrl}/subItems/:itemId/delete/subItem`, auth.isAuthorized, itemController.deleteSubItemOfAnItem);

    /**
     * 
     * @apiGroup subItems
     * @apiVersion  1.0.0
     * @api {put} /api/v1/subItems/:itemId/delete/subItem to delete a subItem of an item .
     * 
     * @apiParam {string} itemId itemId of the item. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} subItemId subItemId of the subItem. (body params) (required).
     * @apiParam {string} historyToken historyToken of the subItem. (body params) (required).
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Item details Updated : Sub Item Deleted",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "ok": 1
            }
        }
     * 
     */


    // params: itemId,authToken,subItemId.
    app.get(`${baseUrl}/subItems/:itemId/:subItemId/details`, auth.isAuthorized, itemController.getSubItemDetails);

    /**
     * 
     * @apiGroup subItems
     * @apiVersion  1.0.0
     * @api {get} /api/v1/subItems/:itemId/:subItemId/details to get subItem details of an item .
     * 
     * @apiParam {string} itemId itemId of the item. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * @apiParam {string} subItemId subItemId of the subItem. (query params) (required).
     * 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "Sub Item Details Found",
            "status": 200,
            "data": {
                "_id": "5dea7e6a1653fe2991f7d574",
                "itemId": "dvE8v3pNN",
                "listId": "ZWngN1csl",
                "itemName": "itemtest2",
                "itemCreatorId": "hZ53_DA0V",
                "itemCreatorName": "raju kumar",
                "itemCreatedOn": "2019-12-06T16:14:34.000Z",
                "itemModifiedOn": "2019-12-06T17:38:46.000Z",
                "itemModifierId": null,
                "itemModifierName": null,
                "itemDone": "no",
                "subItems": [
                    {
                        "subItemId": "rzyhukMEg",
                        "subItemName": "subitemtest1",
                        "subItemCreatorId": "hZ53_DA0V",
                        "subItemCreatorName": "raju kumar",
                        "subItemCreatedOn": "2019-12-06T16:32:30.000Z",
                        "subItemModifiedOn": "2019-12-06T16:32:30.000Z",
                        "subItemModifierId": "hZ53_DA0V",
                        "subItemModifierName": "raju kumar",
                        "subItemDone": "yes",
                        "_id": "5dea829e1653fe2991f7d57a"
                    },
                    {
                        "subItemId": "ubtgIH5zP",
                        "subItemName": "subitemtest2",
                        "subItemCreatorId": "hZ53_DA0V",
                        "subItemCreatorName": "raju kumar",
                        "subItemCreatedOn": "2019-12-06T16:33:25.000Z",
                        "subItemModifiedOn": "2019-12-06T16:33:25.000Z",
                        "subItemModifierId": "hZ53_DA0V",
                        "subItemModifierName": "raju kumar",
                        "subItemDone": "no",
                        "_id": "5dea82d51653fe2991f7d57d"
                    }
                ],
                "__v": 0
            }
        }
     * 
     */


    // api for history...........

    //params: authToken, userId
    app.get(`${baseUrl}/history/view/all/:userId/history`, auth.isAuthorized, historyController.getAllHistoryOfAUser)

    /**
     * 
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {get} /api/v1/history/view/all/:userId/history to get history of a user .
     * 
     * @apiParam {string} userId userId of a user. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "History Details found of a user",
            "status": 200,
            "data": [
                {
                    "_id": "5dea9b24a9d47a3b06ef3c22",
                    "historyId": "9KLsF1hD4C",
                    "actionPerformedOn": "subItem-add",
                    "objectToRestore": {
                        "_id": "5dea7e6a1653fe2991f7d574",
                        "itemId": "dvE8v3pNN",
                        "listId": "ZWngN1csl",
                        "itemName": "itemtest2",
                        "itemCreatorId": "hZ53_DA0V",
                        "itemCreatorName": "raju kumar",
                        "itemCreatedOn": "2019-12-06T16:14:34.000Z",
                        "itemModifiedOn": "2019-12-06T18:15:35.000Z",
                        "itemModifierId": "hZ53_DA0V",
                        "itemModifierName": "raju kumar",
                        "itemDone": "no",
                        "subItems": [
                            {
                                "subItemId": "rzyhukMEg",
                                "subItemName": "subitemtest1",
                                "subItemCreatorId": "hZ53_DA0V",
                                "subItemCreatorName": "raju kumar",
                                "subItemCreatedOn": "2019-12-06T16:32:30.000Z",
                                "subItemModifiedOn": "2019-12-06T16:32:30.000Z",
                                "subItemModifierId": "hZ53_DA0V",
                                "subItemModifierName": "raju kumar",
                                "subItemDone": "yes",
                                "_id": "5dea829e1653fe2991f7d57a"
                            },
                            {
                                "subItemId": "ubtgIH5zP",
                                "subItemName": "subitemtest2",
                                "subItemCreatorId": "hZ53_DA0V",
                                "subItemCreatorName": "raju kumar",
                                "subItemCreatedOn": "2019-12-06T16:33:25.000Z",
                                "subItemModifiedOn": "2019-12-06T16:33:25.000Z",
                                "subItemModifierId": "hZ53_DA0V",
                                "subItemModifierName": "raju kumar",
                                "subItemDone": "no",
                                "_id": "5dea82d51653fe2991f7d57d"
                            },
                            {
                                "subItemId": "Tn30qSrGy",
                                "subItemName": "subitemtest4",
                                "subItemCreatorId": "hZ53_DA0V",
                                "subItemCreatorName": "raju kumar",
                                "subItemCreatedOn": "2019-12-06T18:15:35.000Z",
                                "subItemModifiedOn": "2019-12-06T18:15:35.000Z",
                                "subItemModifierId": "hZ53_DA0V",
                                "subItemModifierName": "raju kumar",
                                "subItemDone": "no",
                                "_id": "5dea9ac7a9d47a3b06ef3c1e"
                            }
                        ],
                        "__v": 0
                    },
                    "listId": "ZWngN1csl",
                    "itemId": "dvE8v3pNN",
                    "listCreatorUserId": "hZ53_DA0V",
                    "storedTime": "2019-12-06T18:17:08.000Z",
                    "__v": 0
                },
                {
                    "_id": "5dea9a87a9d47a3b06ef3c1c",
                    "historyId": "JKiRBrvSB",
                    "actionPerformedOn": "item-edit",
                    "objectToRestore": {
                        "_id": "5dea766eef5b5b243a643282",
                        "itemId": "RvaKWHwVd",
                        "listId": "ZWngN1csl",
                        "itemName": "itemedit4",
                        "itemCreatorId": "hZ53_DA0V",
                        "itemCreatorName": "raju kumar",
                        "itemCreatedOn": "2019-12-06T15:40:30.000Z",
                        "itemModifiedOn": "2019-12-06T18:04:43.000Z",
                        "itemModifierId": "hZ53_DA0V",
                        "itemModifierName": "raju kumar",
                        "itemDone": "no",
                        "subItems": [],
                        "__v": 0
                    },
                    "listId": "ZWngN1csl",
                    "itemId": "RvaKWHwVd",
                    "listCreatorUserId": "hZ53_DA0V",
                    "storedTime": "2019-12-06T18:14:31.000Z",
                    "__v": 0
                },
                {
                    "_id": "5dea6282ef5b5b243a643280",
                    "historyId": "WGtGBazb5",
                    "actionPerformedOn": "list-edit",
                    "objectToRestore": {
                        "_id": "5dea576463d5441b3da9ff20",
                        "listId": "ZWngN1csl",
                        "listName": "list edit3",
                        "listCreatorId": "hZ53_DA0V",
                        "listCreatorName": "raju kumar",
                        "listModifierId": "hZ53_DA0V",
                        "listModifierName": "raju kumar",
                        "listCreatedOn": "2019-12-06T13:28:04.000Z",
                        "listModifiedOn": "2019-12-06T14:14:50.000Z",
                        "__v": 0
                    },
                    "listId": "ZWngN1csl",
                    "itemId": "",
                    "listCreatorUserId": "hZ53_DA0V",
                    "storedTime": "2019-12-06T14:15:30.000Z",
                    "__v": 0
                },
                {
                    "_id": "5dea625aef5b5b243a64327e",
                    "historyId": "5euSlyREu",
                    "actionPerformedOn": "list-edit",
                    "objectToRestore": {
                        "_id": "5dea576463d5441b3da9ff20",
                        "listId": "ZWngN1csl",
                        "listName": "list edit2",
                        "listCreatorId": "hZ53_DA0V",
                        "listCreatorName": "raju kumar",
                        "listModifierId": "hZ53_DA0V",
                        "listModifierName": "raju kumar",
                        "listCreatedOn": "2019-12-06T13:28:04.000Z",
                        "listModifiedOn": "2019-12-06T14:10:39.000Z",
                        "__v": 0
                    },
                    "listId": "ZWngN1csl",
                    "itemId": "",
                    "listCreatorUserId": "hZ53_DA0V",
                    "storedTime": "2019-12-06T14:14:50.000Z",
                    "__v": 0
                }
                    
            ]
        }
     * 
     */

    // params: historyId, authToken.
    app.post(`${baseUrl}/history/:historyId/delete`, auth.isAuthorized, historyController.deleteHistoryObj)

    /**
     * 
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {post} /api/v1/history/:historyId/delete to delete a history .
     * 
     * @apiParam {string} historyId historyId of a history. (query params) (required).
     * @apiParam {string} authToken authToken of the user. (query params) (required).
     * 
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
     * 
     * {
            "error": false,
            "message": "History obj deleted successfully",
            "status": 200,
            "data": {
                "historyId": "WGtGBazb5",
                "actionPerformedOn": "list-edit",
                "objectToRestore": {
                    "_id": "5dea576463d5441b3da9ff20",
                    "listId": "ZWngN1csl",
                    "listName": "list edit3",
                    "listCreatorId": "hZ53_DA0V",
                    "listCreatorName": "raju kumar",
                    "listModifierId": "hZ53_DA0V",
                    "listModifierName": "raju kumar",
                    "listCreatedOn": "2019-12-06T13:28:04.000Z",
                    "listModifiedOn": "2019-12-06T14:14:50.000Z",
                    "__v": 0
                },
                "listId": "ZWngN1csl",
                "itemId": "",
                "listCreatorUserId": "hZ53_DA0V",
                "storedTime": "2019-12-06T14:15:30.000Z",
                "_id": "5dea6282ef5b5b243a643280",
                "__v": 0
            }
        }
     * 
     */

}