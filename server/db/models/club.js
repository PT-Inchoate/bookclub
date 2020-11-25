const Sequelize = require('sequelize');
const db = require('../db');

const Club = db.define('club', {
    name: {
        type: Sequelize.STRING,
    },
    current_book: {
        type: Sequelize.STRING,
    },
    members: { 
        type: Sequelize.STRING, 
        get: function() {
            return JSON.parse(this.getDataValue('members'));
        }, 
        set: function(val) {
            return this.setDataValue('members', JSON.stringify(val));
        }
    },
    max_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1,
        },
    },
    private: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
    },
    start_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    end_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    }
});

module.exports = Club;