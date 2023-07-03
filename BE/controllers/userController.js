"use strict";
const Models = require("../models");


const getUsers = (req, res) => {
    Models.Users.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getUsersByID = (req, res) => {
    Models.Users.findAll({where: { id: req.params.id }}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const createUsers = (data, res) => {
    console.log('createIngredients')
    Models.Users.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const updateUsers = (req, res) => {
    console.log('test')
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

module.exports = {
    getUsers, createUsers, updateUsers, deleteUsers, getUsersByID
}