"use strict";
const Models = require("../models");
// const redis = require("redis");
// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: process.env.REDIS_PORT || 6379,
// });

const getDebts = (req, res) => {
    // const limit = JSON.parse(req.query.limit)
    // const offset = JSON.parse(req.query.offset)
    Models.Debts.findAll({
        // limit: limit,
        // offset: offset
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

// const getDebts = (req, res) => {
//     // Check if data exists in the cache
//     redisClient.get("debts", (err, cachedData) => {
//       if (err) {
//         console.error("Error retrieving cached data:", err);
//       }
  
//       if (cachedData !== null) {
//         // Cached data exists, send cached data
//         const parsedData = JSON.parse(cachedData);
//         res.json(parsedData);
//       } else {
//         // Data not found in cache, fetch from the database
//         Models.Debts.findAll().then((data) => {
//           // Store data in the cache for 1 hour
//           redisClient.setex("debts", 3600, JSON.stringify(data));
//           res.json(data);
//         }).catch(err => {
//           console.error("Error fetching data from database:", err);
//           res.status(500).json({ error: "Internal server error" });
//         });
//       }
//     });
//   };
  
  

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

// const createDebts = (data, res) => {
//     Models.Debts.create(data).then((data) => {
//       // Clear the "debts" cache
//       client.del("debts");
//       res.send({ result: 200, data: data });
//     }).catch(err => {
//       throw err;
//     });
//   };
  

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

const deleteDebtsByUserID = (req, res) => {
    Models.Debts.destroy({ where: { userid: req.params.userid } }).then(function (data) {
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
    getDebts, createDebts, updateDebts, deleteDebts, getDebtsByID, getDebtsByUserID, lockDebts, unlockDebts, deleteDebtsByUserID
}