const mongoose = require('mongoose');

const bl = new mongoose.Schema({
    userID: String,
    reason: String,
    image: String
});

module.exports = mongoose.model('blacklist', bl)