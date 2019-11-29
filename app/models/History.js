const mongoose = require('mongoose');
Schema = mongoose.Schema;

let historySchema = new Schema({
    historyId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    actionPerformedOn: {
        type: String,
        default: ''
    },
    objectToRestore: {
        type: Object,
        default: ''
    },
    listId: {
        type: String,
        default: ''
    },
    itemId: {
        type: String,
        default: ''
    },
    listCreatorUserId: {
        type: String,
        default: ''
    },
    storedTime: {
        type: Date,
        default: ''
    }
})

mongoose.model('History', historySchema);