const mongoose = require("mongoose");
const validator = require("validator");
const connectdb = require('../config/db');
const plm = require('passport-local-mongoose');

const { model } = mongoose; 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    enrollment: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email format'],
    },
    dob:{
        type: String,   
        required: true 
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isMobilePhone, 'Invalid phone number format'],
      },
}, { timestamps: true }); 

userSchema.plugin(plm);

module.exports = model('User', userSchema);
