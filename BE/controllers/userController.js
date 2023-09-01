"use strict";
const Models = require("../models");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken"); // CommonJS syntax

const getUsers = (req, res) => {
    Models.Users.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getUsersByID = (req, res) => {
    Models.Users.findAll({ where: { id: req.params.id } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const validatePasswordOfUser = (req, res) => {
    const path = req.route.path
    const password = req.body.password
    if (password) {
        const uppercaseLetters = password.match(/[A-Z]/g)
        const numbersNeeded = password.match(/\d/g)
        console.log(password)
        if (password==='') {
            password='Pass1'
            updateUsers(req, res)
        }
        else if (password.length < 4) {
            res.send({ result: 400, message: 'Password must be at least 4 characters long.' })
        }
        // else if (password === currentUser.password) {
        //     res.send({ result: 400, message: 'Password must be at least 4 characters long.' })
        //   alert(`Can not match existing password.`)
        // }
        else if (uppercaseLetters == null || uppercaseLetters.length < 1) {
            res.send({ result: 400, message: 'Password must have at least 1 uppercase character.' })
        }
        else if (numbersNeeded == null || numbersNeeded.length < 1) {
            res.send({ result: 400, message: 'Password must include at least 1 number.' })
        }
        else if (path === '/put/:id') {
            updateUsers(req, res)
        }
        else {
            validateCreatedUser(req.body, res)
        }
    } else {
        updateUsers(req, res)
    }
}

const validateCreatedUser = (data, res) => {
    const body = data
    Models.Users.findAll({ where: { username: data.username } }, body).then(function (data) {
        if (data.length > 0) {
            res.send({ result: 400, message: "Username already exists" })
        } else {
            createUser(body, res)
        }
    }).catch(err => {
        throw err
    })
}

const updateUsers = async (req, res) => {
    if (req.body.password) {req.body.password = await bcrypt.hash(req.body.password, 10);}// Hash the user's password
    Models.Users.update(req.body, {
        where: {
            id:
                req.params.id
        }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}
const deleteUsers = (req, res) => {
    Models.Users.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

// Function to create a new user
const createUser = async (data, res) => {
    // Hash the user's password
    data.password = await bcrypt.hash(data.password, 10);
    // Create a new user in the User model
    Models.Users.create(data).then(function (data) {
        // Send the data as response
        res.send({ result: 200, data: data })
    }).catch(err => {
        // If there is an error, throw it
        throw err
    })
}

// Function to login a user
const loginUser = (req, res) => {
    // Find the user with the given username in the User model
    Models.Users.findOne({ where: { username: req.body.username } }).then(
        async function (user) {
            // If the user exists and the password is correct, send the user data as a response
            if (user && (await bcrypt.compare(req.body.password, user.password))) {
                // Replace "your-secret-key" with your actual secret key
                const secretKey = "817960";

                // Create a payload with user information
                const payload = {
                    userId: user.id,
                    username: user.username,
                };

                // Generate a token with jwt.sign
                const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

                // Send the user data and token in the response
                res.send({ result: 200, data: { user, token } });
            } else {
                res.send({ result: 400, data: "Invalid User" });
            }
        }
    ).catch((err) => {
        // If there is an error, handle it
        console.error(err);
        res.status(500).send({ result: 500, data: "Internal Server Error" });
    });
};


module.exports = {
    getUsers, validatePasswordOfUser, updateUsers, deleteUsers, getUsersByID, loginUser
}