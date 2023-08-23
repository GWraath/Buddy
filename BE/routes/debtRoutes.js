
const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/debtController");
const rateLimit = require('express-rate-limit');

// Create a rate limiter that allows one request per second
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // 1 request per windowMs
  });
  

router.get('/', (req, res) => {
    console.log(req.query.limit)  
    Controllers.getDebts(req, res);
})

router.get('/:id', (req, res) => {
    Controllers.getDebtsByID(req, res);
})

router.get('/userdebts/:userid', (req, res) => {
    Controllers.getDebtsByUserID(req, res);
})

router.post('/create', limiter, (req, res) => {
    Controllers.createDebts(req.body, res)
})

router.put('/put/:id', (req, res) => {
    Controllers.updateDebts(req, res)
})

router.delete('/delete/:id', (req, res) => {
    Controllers.deleteDebts(req, res)
})

router.delete('/userdebts/:userid', (req, res) => {
    Controllers.deleteDebtsByUserID(req, res);
})

router.lock('/', (req, res) => {  
    Controllers.lockDebts(req, res);
})

router.unlock('/', (req, res) => {  
    Controllers.unlockDebts(req, res);
})

module.exports = router;