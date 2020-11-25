const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('password');
        },
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    avatar: {
        type: Sequelize.STRING,
        defaultValue:
          'https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg'
    },
    language: {
        type: Sequelize.STRING,
        defaultValue: 'en',
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt');
        },
    }
});

module.exports = User;

User.prototype.correctPassword = function(candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
    return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt());
    }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
    users.forEach(setSaltAndPassword);
});
