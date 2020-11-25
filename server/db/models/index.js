const User = require('./user');
const Club = require('./club');

User.hasMany(Club);

module.exports = {
    User,
    Club
};
