const mongoose = require('mongoose');
Schema = mongoose.Schema;

let userSchema = new Schema({

    userId: {
        type: String,
        unique: true,
        index: true,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: 'password'
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    mobileNumber: {
        type: Number,
        default: 0
    },
    country: {
        type: String,
        default: 'india'
    },
    countryCode: {
        type: Number,
        default: 91
    },
    createdOn: {
        type: Date,
        default: ""
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: String,
        default: ''
    },

    friends: {
        type: [{
            friendId: {
                type: String,
                default: ''
            },

            friendName: {
                type: String,
                default: ''
            },

        }],
    },

    friendRequestRecieved: {
        type: [{
            friendId: {
                type: String,
                default: ''
            },

            friendName: {
                type: String,
                default: ''
            },

        }],
    },

    friendRequestSent: {
        type: [{
            friendId: {
                type: String,
                default: ''
            },

            friendName: {
                type: String,
                default: ''
            },

        }],
    },

})

mongoose.model('User', userSchema);