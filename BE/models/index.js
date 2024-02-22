'use strict'

const Debts = require('./debts') //require the model
const Users = require('./users') //require the model

async function init() {
    await Users.sync();
    await Debts.sync();
  
    
    //sync the model
};

init();
module.exports = {
    Debts, //export the model
    Users //export the model
};

