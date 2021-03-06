define({ "api": [
  {
    "group": "history",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/history/view/all/:userId/history",
    "title": "to get history of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of a user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"History Details found of a user\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"_id\": \"5dea9b24a9d47a3b06ef3c22\",\n                    \"historyId\": \"9KLsF1hD4C\",\n                    \"actionPerformedOn\": \"subItem-add\",\n                    \"objectToRestore\": {\n                        \"_id\": \"5dea7e6a1653fe2991f7d574\",\n                        \"itemId\": \"dvE8v3pNN\",\n                        \"listId\": \"ZWngN1csl\",\n                        \"itemName\": \"itemtest2\",\n                        \"itemCreatorId\": \"hZ53_DA0V\",\n                        \"itemCreatorName\": \"raju kumar\",\n                        \"itemCreatedOn\": \"2019-12-06T16:14:34.000Z\",\n                        \"itemModifiedOn\": \"2019-12-06T18:15:35.000Z\",\n                        \"itemModifierId\": \"hZ53_DA0V\",\n                        \"itemModifierName\": \"raju kumar\",\n                        \"itemDone\": \"no\",\n                        \"subItems\": [\n                            {\n                                \"subItemId\": \"rzyhukMEg\",\n                                \"subItemName\": \"subitemtest1\",\n                                \"subItemCreatorId\": \"hZ53_DA0V\",\n                                \"subItemCreatorName\": \"raju kumar\",\n                                \"subItemCreatedOn\": \"2019-12-06T16:32:30.000Z\",\n                                \"subItemModifiedOn\": \"2019-12-06T16:32:30.000Z\",\n                                \"subItemModifierId\": \"hZ53_DA0V\",\n                                \"subItemModifierName\": \"raju kumar\",\n                                \"subItemDone\": \"yes\",\n                                \"_id\": \"5dea829e1653fe2991f7d57a\"\n                            },\n                            {\n                                \"subItemId\": \"ubtgIH5zP\",\n                                \"subItemName\": \"subitemtest2\",\n                                \"subItemCreatorId\": \"hZ53_DA0V\",\n                                \"subItemCreatorName\": \"raju kumar\",\n                                \"subItemCreatedOn\": \"2019-12-06T16:33:25.000Z\",\n                                \"subItemModifiedOn\": \"2019-12-06T16:33:25.000Z\",\n                                \"subItemModifierId\": \"hZ53_DA0V\",\n                                \"subItemModifierName\": \"raju kumar\",\n                                \"subItemDone\": \"no\",\n                                \"_id\": \"5dea82d51653fe2991f7d57d\"\n                            },\n                            {\n                                \"subItemId\": \"Tn30qSrGy\",\n                                \"subItemName\": \"subitemtest4\",\n                                \"subItemCreatorId\": \"hZ53_DA0V\",\n                                \"subItemCreatorName\": \"raju kumar\",\n                                \"subItemCreatedOn\": \"2019-12-06T18:15:35.000Z\",\n                                \"subItemModifiedOn\": \"2019-12-06T18:15:35.000Z\",\n                                \"subItemModifierId\": \"hZ53_DA0V\",\n                                \"subItemModifierName\": \"raju kumar\",\n                                \"subItemDone\": \"no\",\n                                \"_id\": \"5dea9ac7a9d47a3b06ef3c1e\"\n                            }\n                        ],\n                        \"__v\": 0\n                    },\n                    \"listId\": \"ZWngN1csl\",\n                    \"itemId\": \"dvE8v3pNN\",\n                    \"listCreatorUserId\": \"hZ53_DA0V\",\n                    \"storedTime\": \"2019-12-06T18:17:08.000Z\",\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"5dea9a87a9d47a3b06ef3c1c\",\n                    \"historyId\": \"JKiRBrvSB\",\n                    \"actionPerformedOn\": \"item-edit\",\n                    \"objectToRestore\": {\n                        \"_id\": \"5dea766eef5b5b243a643282\",\n                        \"itemId\": \"RvaKWHwVd\",\n                        \"listId\": \"ZWngN1csl\",\n                        \"itemName\": \"itemedit4\",\n                        \"itemCreatorId\": \"hZ53_DA0V\",\n                        \"itemCreatorName\": \"raju kumar\",\n                        \"itemCreatedOn\": \"2019-12-06T15:40:30.000Z\",\n                        \"itemModifiedOn\": \"2019-12-06T18:04:43.000Z\",\n                        \"itemModifierId\": \"hZ53_DA0V\",\n                        \"itemModifierName\": \"raju kumar\",\n                        \"itemDone\": \"no\",\n                        \"subItems\": [],\n                        \"__v\": 0\n                    },\n                    \"listId\": \"ZWngN1csl\",\n                    \"itemId\": \"RvaKWHwVd\",\n                    \"listCreatorUserId\": \"hZ53_DA0V\",\n                    \"storedTime\": \"2019-12-06T18:14:31.000Z\",\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"5dea6282ef5b5b243a643280\",\n                    \"historyId\": \"WGtGBazb5\",\n                    \"actionPerformedOn\": \"list-edit\",\n                    \"objectToRestore\": {\n                        \"_id\": \"5dea576463d5441b3da9ff20\",\n                        \"listId\": \"ZWngN1csl\",\n                        \"listName\": \"list edit3\",\n                        \"listCreatorId\": \"hZ53_DA0V\",\n                        \"listCreatorName\": \"raju kumar\",\n                        \"listModifierId\": \"hZ53_DA0V\",\n                        \"listModifierName\": \"raju kumar\",\n                        \"listCreatedOn\": \"2019-12-06T13:28:04.000Z\",\n                        \"listModifiedOn\": \"2019-12-06T14:14:50.000Z\",\n                        \"__v\": 0\n                    },\n                    \"listId\": \"ZWngN1csl\",\n                    \"itemId\": \"\",\n                    \"listCreatorUserId\": \"hZ53_DA0V\",\n                    \"storedTime\": \"2019-12-06T14:15:30.000Z\",\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"5dea625aef5b5b243a64327e\",\n                    \"historyId\": \"5euSlyREu\",\n                    \"actionPerformedOn\": \"list-edit\",\n                    \"objectToRestore\": {\n                        \"_id\": \"5dea576463d5441b3da9ff20\",\n                        \"listId\": \"ZWngN1csl\",\n                        \"listName\": \"list edit2\",\n                        \"listCreatorId\": \"hZ53_DA0V\",\n                        \"listCreatorName\": \"raju kumar\",\n                        \"listModifierId\": \"hZ53_DA0V\",\n                        \"listModifierName\": \"raju kumar\",\n                        \"listCreatedOn\": \"2019-12-06T13:28:04.000Z\",\n                        \"listModifiedOn\": \"2019-12-06T14:10:39.000Z\",\n                        \"__v\": 0\n                    },\n                    \"listId\": \"ZWngN1csl\",\n                    \"itemId\": \"\",\n                    \"listCreatorUserId\": \"hZ53_DA0V\",\n                    \"storedTime\": \"2019-12-06T14:14:50.000Z\",\n                    \"__v\": 0\n                }\n                    \n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "history",
    "name": "GetApiV1HistoryViewAllUseridHistory"
  },
  {
    "group": "history",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/history/:historyId/delete",
    "title": "to delete a history .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyId",
            "description": "<p>historyId of a history. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"History obj deleted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"historyId\": \"WGtGBazb5\",\n                \"actionPerformedOn\": \"list-edit\",\n                \"objectToRestore\": {\n                    \"_id\": \"5dea576463d5441b3da9ff20\",\n                    \"listId\": \"ZWngN1csl\",\n                    \"listName\": \"list edit3\",\n                    \"listCreatorId\": \"hZ53_DA0V\",\n                    \"listCreatorName\": \"raju kumar\",\n                    \"listModifierId\": \"hZ53_DA0V\",\n                    \"listModifierName\": \"raju kumar\",\n                    \"listCreatedOn\": \"2019-12-06T13:28:04.000Z\",\n                    \"listModifiedOn\": \"2019-12-06T14:14:50.000Z\",\n                    \"__v\": 0\n                },\n                \"listId\": \"ZWngN1csl\",\n                \"itemId\": \"\",\n                \"listCreatorUserId\": \"hZ53_DA0V\",\n                \"storedTime\": \"2019-12-06T14:15:30.000Z\",\n                \"_id\": \"5dea6282ef5b5b243a643280\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "history",
    "name": "PostApiV1HistoryHistoryidDelete"
  },
  {
    "group": "items",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/items/:itemId/details",
    "title": "to get details  of an item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Item Found\",\n            \"status\": 200,\n            \"data\": {\n                \"_id\": \"5dea7e6a1653fe2991f7d574\",\n                \"itemId\": \"dvE8v3pNN\",\n                \"listId\": \"ZWngN1csl\",\n                \"itemName\": \"itemtest2\",\n                \"itemCreatorId\": \"hZ53_DA0V\",\n                \"itemCreatorName\": \"raju kumar\",\n                \"itemCreatedOn\": \"2019-12-06T16:14:34.000Z\",\n                \"itemModifiedOn\": \"2019-12-06T16:14:34.000Z\",\n                \"itemModifierId\": \"hZ53_DA0V\",\n                \"itemModifierName\": \"raju kumar\",\n                \"itemDone\": \"no\",\n                \"subItems\": [],\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "items",
    "name": "GetApiV1ItemsItemidDetails"
  },
  {
    "group": "items",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/items/view/all/:listId/items",
    "title": "to get all item of a list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All Items Found of a list\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"_id\": \"5dea766eef5b5b243a643282\",\n                    \"itemId\": \"RvaKWHwVd\",\n                    \"listId\": \"ZWngN1csl\",\n                    \"itemName\": \"itemedit1\",\n                    \"itemCreatorId\": \"hZ53_DA0V\",\n                    \"itemCreatorName\": \"raju kumar\",\n                    \"itemCreatedOn\": \"2019-12-06T15:40:30.000Z\",\n                    \"itemModifiedOn\": \"2019-12-06T15:54:31.000Z\",\n                    \"itemModifierId\": \"hZ53_DA0V\",\n                    \"itemModifierName\": \"raju kumar\",\n                    \"itemDone\": \"no\",\n                    \"subItems\": [],\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"5dea7e6a1653fe2991f7d574\",\n                    \"itemId\": \"dvE8v3pNN\",\n                    \"listId\": \"ZWngN1csl\",\n                    \"itemName\": \"itemtest2\",\n                    \"itemCreatorId\": \"hZ53_DA0V\",\n                    \"itemCreatorName\": \"raju kumar\",\n                    \"itemCreatedOn\": \"2019-12-06T16:14:34.000Z\",\n                    \"itemModifiedOn\": \"2019-12-06T16:14:34.000Z\",\n                    \"itemModifierId\": \"hZ53_DA0V\",\n                    \"itemModifierName\": \"raju kumar\",\n                    \"itemDone\": \"no\",\n                    \"subItems\": [],\n                    \"__v\": 0\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "items",
    "name": "GetApiV1ItemsViewAllListidItems"
  },
  {
    "group": "items",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/items/add/item",
    "title": "to add new item to a list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>itemName of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemCreatorId",
            "description": "<p>itemCreatorId of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemCreatorName",
            "description": "<p>itemCreatorName of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemModifierId",
            "description": "<p>itemModifierId of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemModifierName",
            "description": "<p>itemModifierName of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemDone",
            "description": "<p>itemDone of the item. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"Item Created\",\n            \"status\": 200,\n            \"data\": {\n                \"itemId\": \"RvaKWHwVd\",\n                \"listId\": \"ZWngN1csl\",\n                \"itemName\": \"itemtest1\",\n                \"itemCreatorId\": \"hZ53_DA0V\",\n                \"itemCreatorName\": \"raju kumar\",\n                \"itemCreatedOn\": \"2019-12-06T15:40:30.000Z\",\n                \"itemModifiedOn\": \"2019-12-06T15:40:30.000Z\",\n                \"itemModifierId\": \"hZ53_DA0V\",\n                \"itemModifierName\": \"raju kumar\",\n                \"itemDone\": \"no\",\n                \"_id\": \"5dea766eef5b5b243a643282\",\n                \"subItems\": [],\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "items",
    "name": "PostApiV1ItemsAddItem"
  },
  {
    "group": "items",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/items/:itemId/delete",
    "title": "to delete an item of a list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the item. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"item deleted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"itemId\": \"HsXhnXiVC\",\n                \"listId\": \"ZWngN1csl\",\n                \"itemName\": \"itemtest3\",\n                \"itemCreatorId\": \"hZ53_DA0V\",\n                \"itemCreatorName\": \"raju kumar\",\n                \"itemCreatedOn\": \"2019-12-06T16:14:44.000Z\",\n                \"itemModifiedOn\": \"2019-12-06T16:14:44.000Z\",\n                \"itemModifierId\": \"hZ53_DA0V\",\n                \"itemModifierName\": \"raju kumar\",\n                \"itemDone\": \"no\",\n                \"_id\": \"5dea7e741653fe2991f7d576\",\n                \"subItems\": [],\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "items",
    "name": "PostApiV1ItemsItemidDelete"
  },
  {
    "group": "items",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/items/:itemId/update/item",
    "title": "to edit an item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the item. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Item details Updated\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "items",
    "name": "PutApiV1ItemsItemidUpdateItem"
  },
  {
    "group": "lists",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:listId/details",
    "title": "to get list details of a list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of a list. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"List Found\",\n            \"status\": 200,\n            \"data\": {\n                \"_id\": \"5dea576463d5441b3da9ff20\",\n                \"listId\": \"ZWngN1csl\",\n                \"listName\": \"list edit4\",\n                \"listCreatorId\": \"hZ53_DA0V\",\n                \"listCreatorName\": \"raju kumar\",\n                \"listModifierId\": \"hZ53_DA0V\",\n                \"listModifierName\": \"raju kumar\",\n                \"listCreatedOn\": \"2019-12-06T13:28:04.000Z\",\n                \"listModifiedOn\": \"2019-12-06T14:15:30.000Z\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "lists",
    "name": "GetApiV1ListsListidDetails"
  },
  {
    "group": "lists",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/view/all/:userId/lists",
    "title": "to get all list of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Lists Found and Listed\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"_id\": \"5dea576463d5441b3da9ff20\",\n                    \"listId\": \"ZWngN1csl\",\n                    \"listName\": \"list edit4\",\n                    \"listCreatorId\": \"hZ53_DA0V\",\n                    \"listCreatorName\": \"raju kumar\",\n                    \"listModifierId\": \"hZ53_DA0V\",\n                    \"listModifierName\": \"raju kumar\",\n                    \"listCreatedOn\": \"2019-12-06T13:28:04.000Z\",\n                    \"listModifiedOn\": \"2019-12-06T14:15:30.000Z\",\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"5dea5c8063d5441b3da9ff24\",\n                    \"listId\": \"byFNG87CN\",\n                    \"listName\": \"list test2\",\n                    \"listCreatorId\": \"hZ53_DA0V\",\n                    \"listCreatorName\": \"raju kumar\",\n                    \"listModifierId\": \"hZ53_DA0V\",\n                    \"listModifierName\": \"raju kumar\",\n                    \"listCreatedOn\": \"2019-12-06T13:49:52.000Z\",\n                    \"listModifiedOn\": \"2019-12-06T13:49:52.000Z\",\n                    \"__v\": 0\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "lists",
    "name": "GetApiV1ListsViewAllUseridLists"
  },
  {
    "group": "lists",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/createList",
    "title": "to create new list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>listName of list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listCreatorId",
            "description": "<p>listCreatorId of the list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listCreatorName",
            "description": "<p>listCreatorName of the list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listModifierId",
            "description": "<p>listModifierId of the list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listModifierName",
            "description": "<p>listModifierName of the list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the list. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"List Created\",\n            \"status\": 200,\n            \"data\": {\n                \"listId\": \"ZWngN1csl\",\n                \"listName\": \"list test1\",\n                \"listCreatorId\": \"hZ53_DA0V\",\n                \"listCreatorName\": \"raju kumar\",\n                \"listModifierId\": \"hZ53_DA0V\",\n                \"listModifierName\": \"raju kumar\",\n                \"listCreatedOn\": \"2019-12-06T13:28:04.000Z\",\n                \"listModifiedOn\": \"2019-12-06T13:28:04.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "lists",
    "name": "PostApiV1ListsCreatelist"
  },
  {
    "group": "lists",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/lists/:listId/delete",
    "title": "to delete a list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the list. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"list deleted successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"listId\": \"HCn9nlL3r\",\n                \"listName\": \"list test3\",\n                \"listCreatorId\": \"hZ53_DA0V\",\n                \"listCreatorName\": \"raju kumar\",\n                \"listModifierId\": \"hZ53_DA0V\",\n                \"listModifierName\": \"raju kumar\",\n                \"listCreatedOn\": \"2019-12-06T13:50:01.000Z\",\n                \"listModifiedOn\": \"2019-12-06T13:50:01.000Z\",\n                \"_id\": \"5dea5c8963d5441b3da9ff26\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "lists",
    "name": "PutApiV1ListsListidDelete"
  },
  {
    "group": "lists",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/lists/:listId/editList",
    "title": "to edit a list .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>listId of the list. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the list. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"List details Updated\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "lists",
    "name": "PutApiV1ListsListidEditlist"
  },
  {
    "group": "notifications",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/notifications/mark/notification/seen",
    "title": "to mark notification as seen.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notificationId",
            "description": "<p>notificationId of the user. (Send notificationId as query parameter) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Marked As Seen\",\n            \"status\": 200,\n            \"data\": {\n                \"notificationId\": \"Y3GEnkynj\",\n                \"notificationStatus\": \"seen\",\n                \"userEmailToSendNotification\": [\n                    \"satu@gmail.com\",\n                    \"raju@gmail.com\"\n                ],\n                \"_id\": \"5d051e8955c1e60d37edeeb1\",\n                \"notificationListId\": \"Ms_VDaYOU\",\n                \"notificationMessage\": \"hey a list is edited with list Details [object Object]\",\n                \"notificationPurpose\": \"list-edit\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "notifications",
    "name": "GetApiV1NotificationsMarkNotificationSeen"
  },
  {
    "group": "subItems",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/subItems/:itemId/:subItemId/details",
    "title": "to get subItem details of an item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>subItemId of the subItem. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Sub Item Details Found\",\n            \"status\": 200,\n            \"data\": {\n                \"_id\": \"5dea7e6a1653fe2991f7d574\",\n                \"itemId\": \"dvE8v3pNN\",\n                \"listId\": \"ZWngN1csl\",\n                \"itemName\": \"itemtest2\",\n                \"itemCreatorId\": \"hZ53_DA0V\",\n                \"itemCreatorName\": \"raju kumar\",\n                \"itemCreatedOn\": \"2019-12-06T16:14:34.000Z\",\n                \"itemModifiedOn\": \"2019-12-06T17:38:46.000Z\",\n                \"itemModifierId\": null,\n                \"itemModifierName\": null,\n                \"itemDone\": \"no\",\n                \"subItems\": [\n                    {\n                        \"subItemId\": \"rzyhukMEg\",\n                        \"subItemName\": \"subitemtest1\",\n                        \"subItemCreatorId\": \"hZ53_DA0V\",\n                        \"subItemCreatorName\": \"raju kumar\",\n                        \"subItemCreatedOn\": \"2019-12-06T16:32:30.000Z\",\n                        \"subItemModifiedOn\": \"2019-12-06T16:32:30.000Z\",\n                        \"subItemModifierId\": \"hZ53_DA0V\",\n                        \"subItemModifierName\": \"raju kumar\",\n                        \"subItemDone\": \"yes\",\n                        \"_id\": \"5dea829e1653fe2991f7d57a\"\n                    },\n                    {\n                        \"subItemId\": \"ubtgIH5zP\",\n                        \"subItemName\": \"subitemtest2\",\n                        \"subItemCreatorId\": \"hZ53_DA0V\",\n                        \"subItemCreatorName\": \"raju kumar\",\n                        \"subItemCreatedOn\": \"2019-12-06T16:33:25.000Z\",\n                        \"subItemModifiedOn\": \"2019-12-06T16:33:25.000Z\",\n                        \"subItemModifierId\": \"hZ53_DA0V\",\n                        \"subItemModifierName\": \"raju kumar\",\n                        \"subItemDone\": \"no\",\n                        \"_id\": \"5dea82d51653fe2991f7d57d\"\n                    }\n                ],\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "subItems",
    "name": "GetApiV1SubitemsItemidSubitemidDetails"
  },
  {
    "group": "subItems",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/subItems/:itemId/add/subItem",
    "title": "to add new subItem to an item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of an item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemName",
            "description": "<p>subItemName of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemDone",
            "description": "<p>subItemDone of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemCreatorId",
            "description": "<p>subItemCreatorId of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemCreatorName",
            "description": "<p>subItemCreatorName of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemModifierId",
            "description": "<p>subItemModifierId of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemModifierName",
            "description": "<p>subItemModifierName of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"Item details Updated : Sub Item Added\",\n            \"status\": 200,\n            \"data\": {\n                \"subItemId\": \"rzyhukMEg\",\n                \"subItemName\": \"subitemtest1\",\n                \"subItemDone\": \"yes\",\n                \"subItemCreatorId\": \"hZ53_DA0V\",\n                \"subItemCreatorName\": \"raju kumar\",\n                \"subItemModifierId\": \"hZ53_DA0V\",\n                \"subItemModifierName\": \"raju kumar\",\n                \"subItemCreatedOn\": \"2019-12-06T16:32:30Z\",\n                \"subItemModifiedOn\": \"2019-12-06T16:32:30Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "subItems",
    "name": "PutApiV1SubitemsItemidAddSubitem"
  },
  {
    "group": "subItems",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/subItems/:itemId/delete/subItem",
    "title": "to delete a subItem of an item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>subItemId of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the subItem. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Item details Updated : Sub Item Deleted\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "subItems",
    "name": "PutApiV1SubitemsItemidDeleteSubitem"
  },
  {
    "group": "subItems",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/subItems/:itemId/edit/subItem",
    "title": "to edit a subItem of an item .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>itemId of the item. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>subItemId of the subItem. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "historyToken",
            "description": "<p>historyToken of the subItem. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Item details Updated : Sub Item Updated\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "subItems",
    "name": "PutApiV1SubitemsItemidEditSubitem"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/details",
    "title": "to get details of a user .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"User Details Found\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"j-3YxGmZ6\",\n                \"firstName\": \"rohit\",\n                \"lastName\": \"kumar\",\n                \"email\": \"rohit@gmail.com\",\n                \"mobileNumber\": 9431582068,\n                \"country\": \"india\",\n                \"countryCode\": 91,\n                \"createdOn\": \"2019-12-06T10:17:01.000Z\",\n                \"resetPasswordToken\": \"\",\n                \"resetPasswordExpires\": \"\",\n                \"friends\": [\n                    {\n                        \"friendId\": \"69KyiHJOn\",\n                        \"friendName\": \"satu kr\",\n                        \"_id\": \"5dea2bbedfa8bc0fba4cde8b\"\n                    },\n                    {\n                        \"friendId\": \"69KyiHJOn\",\n                        \"friendName\": \"satu kr\",\n                        \"_id\": \"5dea2bc3dfa8bc0fba4cde8d\"\n                    },\n                    {\n                        \"friendId\": \"Iq0YavfPA\",\n                        \"friendName\": \"satyam tiwary\",\n                        \"_id\": \"5dea3047dfa8bc0fba4cde97\"\n                    }\n                ],\n                \"friendRequestRecieved\": [],\n                \"friendRequestSent\": []\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridDetails"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgot/password",
    "title": "to recover forgot password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          \"error\": false,\n          \"message\": \"mail-sent successfully\",\n          \"status\": 200,\n          \"data\": {\n              \"userId\": \"69KyiHJOn\",\n              \"firstName\": \"satu\",\n              \"lastName\": \"kr\",\n              \"password\": \"$2a$10$6caj3w/RhUSJi1LuMd7bL.zj81GnwqI9Dvfc/Gbzp8y3x2OK3aoIy\",\n              \"email\": \"satu@gmail.com\",\n              \"mobileNumber\": 9431582057,\n              \"country\": \"india\",\n              \"countryCode\": 91,\n              \"createdOn\": \"2019-11-27T09:32:07.000Z\",\n              \"resetPasswordToken\": \"bFRPO_sk2\",\n              \"resetPasswordExpires\": \"1575641552069\",\n              \"_id\": \"5dde429752cef90884b2c5a6\",\n              \"friends\": [\n                  {\n                      \"friendId\": \"j-3YxGmZ6\",\n                      \"friendName\": \"rohit kumar\",\n                      \"_id\": \"5dea2bbedfa8bc0fba4cde8c\"\n                  },\n                  {\n                      \"friendId\": \"j-3YxGmZ6\",\n                      \"friendName\": \"rohit kumar\",\n                      \"_id\": \"5dea2bc3dfa8bc0fba4cde8e\"\n                  },\n                  {\n                      \"friendId\": \"Iq0YavfPA\",\n                      \"friendName\": \"satyam tiwary\",\n                      \"_id\": \"5dea3441bf5a1413c1232f14\"\n                  }\n              ],\n              \"friendRequestRecieved\": [],\n              \"friendRequestSent\": [],\n              \"__v\": 0\n          }\n      }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotPassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjU0UEVtRjRhbSIsImlhdCI6MTU3NTYzMzY5ODcyMCwiZXhwIjoxNTc1NzIwMDk4NzIwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZC1wMi1Uby1Eby1MaXN0IiwiZGF0YSI6eyJ1c2VySWQiOiJoWjUzX0RBMFYiLCJmaXJzdE5hbWUiOiJyYWp1IiwibGFzdE5hbWUiOiJrdW1hciIsImVtYWlsIjoicmFqdUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjk0MzE1NjIwNTYsImNvdW50cnkiOiJpbmRpYSIsImNvdW50cnlDb2RlIjo5MSwicmVzZXRQYXNzd29yZFRva2VuIjoiIiwicmVzZXRQYXNzd29yZEV4cGlyZXMiOiIiLCJmcmllbmRzIjpbXSwiZnJpZW5kUmVxdWVzdFJlY2lldmVkIjpbXSwiZnJpZW5kUmVxdWVzdFNlbnQiOltdfX0.NV_eraiBCdb6rEeIot-E89_Okf6E-yAL8zi21mdcfh8\",\n        \"userDetails\": {\n            \"userId\": \"hZ53_DA0V\",\n            \"firstName\": \"raju\",\n            \"lastName\": \"kumar\",\n            \"email\": \"raju@gmail.com\",\n            \"mobileNumber\": 9431562056,\n            \"country\": \"india\",\n            \"countryCode\": 91,\n            \"resetPasswordToken\": \"\",\n            \"resetPasswordExpires\": \"\",\n            \"friends\": [],\n            \"friendRequestRecieved\": [],\n            \"friendRequestSent\": []\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/reset/:token",
    "title": "to reset new password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>newPassword of the user. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>resetPasswordToken generated in forgot password. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n            \"error\": false,\n            \"message\": \"mail sent successfully after reset-password.\",\n            \"status\": 200,\n            \"data\": null\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetToken"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>country of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"hZ53_DA0V\",\n        \"firstName\": \"raju\",\n        \"lastName\": \"kumar\",\n        \"email\": \"raju@gmail.com\",\n        \"mobileNumber\": 9431562056,\n        \"country\": \"india\",\n        \"countryCode\": 91,\n        \"createdOn\": \"2019-12-06T11:58:01.000Z\",\n        \"resetPasswordToken\": \"\",\n        \"resetPasswordExpires\": \"\",\n        \"_id\": \"5dea424963d5441b3da9ff1e\",\n        \"friends\": [],\n        \"friendRequestRecieved\": [],\n        \"friendRequestSent\": [],\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/view/all",
    "title": "api for getting all user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"userId\": \"Iq0YavfPA\",\n            \"firstName\": \"satyam\",\n            \"lastName\": \"tiwary\",\n            \"password\": \"$2a$10$KKKzBsRo32ebC4.f4tlBUuWVRui/8o1MZl04D6BdlspKhR5g02iGC\",\n            \"email\": \"satyam@gmail.com\",\n            \"mobileNumber\": 9432583058,\n            \"country\": \"india\",\n            \"countryCode\": 91,\n            \"createdOn\": \"2019-11-17T10:09:48.000Z\",\n            \"resetPasswordToken\": \"\",\n            \"resetPasswordExpires\": \"\",\n            \"friends\": [\n                {\n                    \"friendId\": \"j-3YxGmZ6\",\n                    \"friendName\": \"rohit kumar\",\n                    \"_id\": \"5dea3047dfa8bc0fba4cde98\"\n                },\n                {\n                    \"friendId\": \"69KyiHJOn\",\n                    \"friendName\": \"satu kr\",\n                    \"_id\": \"5dea3441bf5a1413c1232f15\"\n                }\n            ],\n            \"friendRequestRecieved\": [],\n            \"friendRequestSent\": []\n        },\n        {\n            \"userId\": \"69KyiHJOn\",\n            \"firstName\": \"satu\",\n            \"lastName\": \"kr\",\n            \"password\": \"$2a$10$6caj3w/RhUSJi1LuMd7bL.zj81GnwqI9Dvfc/Gbzp8y3x2OK3aoIy\",\n            \"email\": \"satu@gmail.com\",\n            \"mobileNumber\": 9431582057,\n            \"country\": \"india\",\n            \"countryCode\": 91,\n            \"createdOn\": \"2019-11-27T09:32:07.000Z\",\n            \"resetPasswordToken\": \"\",\n            \"resetPasswordExpires\": \"\",\n            \"friends\": [\n                {\n                    \"friendId\": \"j-3YxGmZ6\",\n                    \"friendName\": \"rohit kumar\",\n                    \"_id\": \"5dea2bc3dfa8bc0fba4cde8e\"\n                },\n                {\n                    \"friendId\": \"Iq0YavfPA\",\n                    \"friendName\": \"satyam tiwary\",\n                    \"_id\": \"5dea3441bf5a1413c1232f14\"\n                }\n            ],\n            \"friendRequestRecieved\": [],\n            \"friendRequestSent\": []\n        },\n        {\n            \"userId\": \"j-3YxGmZ6\",\n            \"firstName\": \"rohit\",\n            \"lastName\": \"kumar\",\n            \"password\": \"$2a$10$.qkJIjNLOB7O0AbRP8m7N.bjnj9PWMhsI0iHlVC3DmILfKrLqFu/a\",\n            \"email\": \"rohit@gmail.com\",\n            \"mobileNumber\": 9431582068,\n            \"country\": \"india\",\n            \"countryCode\": 91,\n            \"createdOn\": \"2019-12-06T10:17:01.000Z\",\n            \"resetPasswordToken\": \"\",\n            \"resetPasswordExpires\": \"\",\n            \"friends\": [\n                {\n                    \"friendId\": \"69KyiHJOn\",\n                    \"friendName\": \"satu kr\",\n                    \"_id\": \"5dea2bbedfa8bc0fba4cde8b\"\n                },\n                {\n                    \"friendId\": \"Iq0YavfPA\",\n                    \"friendName\": \"satyam tiwary\",\n                    \"_id\": \"5dea3047dfa8bc0fba4cde97\"\n                }\n            ],\n            \"friendRequestRecieved\": [],\n            \"friendRequestSent\": []\n        },\n        {\n            \"userId\": \"hZ53_DA0V\",\n            \"firstName\": \"raju\",\n            \"lastName\": \"kumar\",\n            \"password\": \"$2a$10$BLhyqr8RIr6hTwBb1TqLu..e/OfWtLE9LGAmKZxA9g3XmSvF9JOeK\",\n            \"email\": \"raju@gmail.com\",\n            \"mobileNumber\": 9431562056,\n            \"country\": \"india\",\n            \"countryCode\": 91,\n            \"createdOn\": \"2019-12-06T11:58:01.000Z\",\n            \"resetPasswordToken\": \"\",\n            \"resetPasswordExpires\": \"\",\n            \"friends\": [],\n            \"friendRequestRecieved\": [],\n            \"friendRequestSent\": []\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersViewAll"
  }
] });
