const mongoose = require('mongoose');
Schema = mongoose.Schema;

let notificationSchema = new Schema({
    notificationId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    notificationListId:
    {
        type: String,
        default: ''
    },
    notificationItemId:
    {
        type: String,
        default: ''
    },
    notificationSubItemId:
    {
        type: String,
        default: ''
    },
    notificationMessage: {
        type: String,
        default: ''
    },
    userIdToSendNotification: {
        type: [String],
        default: ''
    },
    notificationPurpose: {
        type: [String],
        default: ''
    },
    notificationStatus: {
        type: String,
        default: 'un-seen'
    },
    notificationCreatedOn: {
        type: Date,
        default: ""
    }
})

mongoose.model('Notification', notificationSchema);