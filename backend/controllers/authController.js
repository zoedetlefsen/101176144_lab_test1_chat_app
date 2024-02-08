const User = require('../models/UserModel');
const {hashPassword, comparePasswords} = require('../helpers/auth');
const jwt = require('jsonwebtoken');

//REGISTER ENDPOINT
const registerUser = async (req, res) => {
    try {
        const {username, firstName, lastName, password} = req.body;
        // Check if firstName was entered
        if(!firstName){
            return res.json({
                error: 'Please enter your first name'
            })
        };
        if(!lastName){
            return res.json({
                error: 'Please enter your last name'
            })
        }
        //Check if password is good
        if(!password || password.length < 8){
            return res.json({
                error: 'Password required and should be greater than 6 characters long'
            })
        };
        //Check username
        const exist = await User.findOne({username})
        if(exist){
            return res.json({
                error: 'This username is already associated with an account. Please log in or try a new username.'
            })
        }
        const hashedPassword = await hashPassword(password)
        //create User in database
        const user = await User.create({
            username, firstName, lastName, password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//LOGIN ENDPOINT
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        //Check if user exists
        const user = await User.findOne({username});
        if(!user) {
            return res.json({
                error: 'Invalid Username or Password'
            })
        }

        //Check if passwords match
        const match = await comparePasswords(password, user.password)
        if(match) {
            jwt.sign({username: user.username, id: user._id, name: user.firstName}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: 'Invalid Username or Password'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }

}

module.exports = {
    registerUser,
    loginUser,
    getProfile
}