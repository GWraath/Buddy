
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/dynamicController");
const rateLimit = require('express-rate-limit');

// Create a rate limiter that allows one request per second
const getLimiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // 1 request per windowMs
  });

router.get('/', getLimiter, (req, res) => {
    Controllers.getWhatever(req, res);
})

router.get('/:id', (req, res) => {
    Controllers.getWhateverByID(req, res);
})

// // Setting up a POST request for the "/create" endpoint
router.post('/create', (req, res) => {
    //Calling the validatePasswordOfUser function from the userController module, passing in the request body and response objects
    Controllers.createWhatever(req, res);
});

// Setting up a POST request for the "/login" endpoint
router.post('/login', (req, res) => {
    // Calling the loginUser function from the userController module, passing in the request and response objects
    Controllers.loginUser(req, res);
});

router.put('/put/:id', (req, res) => {
    Controllers.updateWhatever(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.deleteWhatever(req, res)
})


module.exports = router;