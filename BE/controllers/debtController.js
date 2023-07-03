"use strict";
const Models = require("../models");


const getDebts = (req, res) => {
    Models.Debts.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getDebtsByID = (req, res) => {
    Models.Debts.findAll({ where: { id: req.params.id } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getDebtsByUserID = (req, res) => {
    Models.Debts.findAll({ where: { userid: req.params.userid } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const createDebts = (data, res) => {
    Models.Debts.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const updateDebts = (req, res) => {
    Models.Debts.update(req.body, {
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
const deleteDebts = (req, res) => {
    Models.Debts.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const lockDebts = (req, rest) => {
    Models.Debts.findAll({

        // const [results, metadata] = await sequelize.query(
        //     "SELECT c.*, u.id AS userId FROM comments c JOIN users u ON c.userId = u.id"
        //   );
        // transaction: t1,
        lock: {
            // level: t1.LOCK,
            of: Models.Debts
        }
    });
}

const unlockDebts = (req, rest) => {
    Models.Debts.findAll({
        unlock: {
            // level: t1.LOCK,
            of: Debts
        }
    });
}

module.exports = {
    getDebts, createDebts, updateDebts, deleteDebts, getDebtsByID, getDebtsByUserID, lockDebts, unlockDebts
}