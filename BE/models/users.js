const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const Debts = require("./debts")


class Users extends Model { }
//Sequelize will create this table if it doesn't exist on startup
Users.init({
    id: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        indexes: [{ constraint: 'debts_ibfk_2' }],
    },
    name: {
        type: DataTypes.STRING, allowNull: false, required: true,
        // indexes: [{ constraint: 'debts_ibfk_2' }],
    },
    total: {
        type: DataTypes.INTEGER, allowNull: true, required: true,
    },
    username: {
        type: DataTypes.STRING, allowNull: false, required: true,
    },
    password: {
        type: DataTypes.STRING, allowNull: false, required: true,
    },
    UserAdmin: {
        type: DataTypes.INTEGER, allowNull: true, required: true
    },
},
    {
        sequelize: sequelizeInstance, modelName: 'Users', timestamps: true, freezeTableName: true
    }
)
module.exports = Users;


