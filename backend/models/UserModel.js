const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        validate(value) {
            if(value < 8) {
              throw new Error('Passwor must be 8 characters or greater')
            }
        }
    },
    createon: {
        type: Date
    }


})


const User = mongoose.model('User', userSchema);

module.exports = User;