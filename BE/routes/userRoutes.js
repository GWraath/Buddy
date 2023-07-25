
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/userController");

router.get('/', (req, res) => {

    Controllers.getUsers(req, res);
})

router.get('/:id', (req, res) => {

    Controllers.getUsersByID(req, res);
})

// router.post('/create', (req, res) => {
//     Controllers.createUsers(req.body, res)
// })

// Setting up a POST request for the "/create" endpoint
router.post('/create', (req, res) => {
    // Calling the createUser function from the userController module, passing in the request body and response objects
    Controllers.createUser(req.body, res);
});

// Setting up a POST request for the "/login" endpoint
router.post('/login', (req, res) => {
    // Calling the loginUser function from the userController module, passing in the request and response objects
    Controllers.loginUser(req, res);
});

router.put('/put/:id', (req, res) => {
    Controllers.updateUsers(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.deleteUsers(req, res)
})


module.exports = router;