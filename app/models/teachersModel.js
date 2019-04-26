const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeachersSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        max: 200
    },
    last_name: {
        type: String,
        required: true,
        max: 200

    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date, 
        default: Date.now,
    }


});

const TeachersModel = mongoose.model('Teachers', TeachersSchema);

module.exports = TeachersModel;