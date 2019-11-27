const mongoose = require('mongoose');
Schema = mongoose.Schema;

let historySchema = new Schema({
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
    userFriendsId: {
        type: [String],
        default: ''
    },
    storedTime: {
        type: Date,
        default: ''
    }
})

mongoose.model('History', historySchema);