"use strict";
const Models = require("../models");

const getWhatever = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getWhateverByID = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.findAll({ where: { id: req.params.id } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const getWhateverByUserID = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.findAll({ where: { result: !null } }).then(function (data) {
        console.log(data)
        Models.update({completed: true}, {
            where: {
                id:
                    data[0].sample_id
            }.then(function (data) {
            res.send({ result: 200, data: data })
        }).catch(err => {
            throw err
        })
    })})
    .catch(err => {
        throw err
    })
}

const createWhatever = (data, req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
} 

const updateWhatever = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.update(req.body, {
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
const deleteWhatever = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const deleteWhateverByUserID = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.destroy({ where: { userid: req.params.userid } }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const lockWhatever = (req, res) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.findAll({

        // const [results, metadata] = await sequelize.query(
        //     "SELECT c.*, u.id AS userId FROM comments c JOIN users u ON c.userId = u.id"
        //   );
        // transaction: t1,
        lock: {
            // level: t1.LOCK,
            of: Models.Whatever
        }
    });
}

const unlockWhatever = (req, rest) => {
    const modelName = req.query.whatever
    const Model = Models[modelName]
    console.log(Models)

    if (!Model) {
        return res.status(400).send({ result: 400, error: 'Invalid model name' });
    }
    Model.findAll({
        unlock: {
            // level: t1.LOCK,
            of: Whatever
        }
    });
}

module.exports = {
    getWhatever, createWhatever, updateWhatever, deleteWhatever, getWhateverByID, getWhateverByUserID, lockWhatever, unlockWhatever, deleteWhateverByUserID
}