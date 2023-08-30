
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/userController");
const rateLimit = require('express-rate-limit');

// Create a rate limiter that allows one request per second
const getLimiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // 1 request per windowMs
  });

router.get('/', getLimiter, (req, res) => {
    Controllers.getUsers(req, res);
})

router.get('/:id', (req, res) => {
    Controllers.getUsersByID(req, res);
})

// // Setting up a POST request for the "/create" endpoint
router.post('/create', (req, res) => {
    //Calling the validatePasswordOfUser function from the userController module, passing in the request body and response objects
    Controllers.validatePasswordOfUser(req, res);
});

// Setting up a POST request for the "/login" endpoint
router.post('/login', (req, res) => {
    // Calling the loginUser function from the userController module, passing in the request and response objects
    Controllers.loginUser(req, res);
});

router.put('/put/:id', (req, res) => {
    Controllers.validatePasswordOfUser(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.deleteUsers(req, res)
})


module.exports = router;