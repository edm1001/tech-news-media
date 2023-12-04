const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt')

class User extends Model {}

User.init(
    {
        // Table Columns go here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    // Table config options go here
    {
        hooks: {
            // hash password for creating of users
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 12);
                return newUserData
            },
            // hash passwords for updating users
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 12);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;