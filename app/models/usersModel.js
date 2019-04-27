const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    company_name: {
        type: String, 
        required: true, 
    },
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    age: {
        type: Number,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    country: {
        type: String,
        required: true,
    },
    timezone: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    }

    
});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;