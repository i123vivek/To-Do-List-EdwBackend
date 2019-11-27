const mongoose = require('mongoose');
Schema = mongoose.Schema

let listSchema = new Schema({

    listId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },

    listName: {
        type: String,
        default: ''
    },

    listCreatorId: {
        type: String,
        default: ''
    },
    listCreatorName: {
        type: String,
        default: ''
    },

    listModifierId: {
        type: String,
        default: ''
    },
    listModifierName: {
        type: String,
        default: ''
    },

    

    listCreatedOn: {
        type: Date,
        default: ""
    },
    listModifiedOn: {
        type: Date,
        default: ""
    }

})

mongoose.model('List', listSchema);