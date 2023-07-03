
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/userController");

router.get('/', (req, res) => {

    Controllers.getUsers(req, res);
})

router.get('/:id', (req, res) => {

    Controllers.getUsersByID(req, res);
})

router.post('/create', (req, res) => {
    Controllers.createUsers(req.body, res)
})

router.put('/put/:id', (req, res) => {
    console.log('test')
    Controllers.updateUsers(req, res)
})
router.delete('/delete', (req, res) => {
    Controllers.deleteUsers(req, res)
})


module.exports = router;