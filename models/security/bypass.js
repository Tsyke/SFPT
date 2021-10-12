const mongoose = require('mongoose');

let bypass = new mongoose.Schema({
    guildID: Number,
    userID: Array
})

module.exports = mongoose.model('bypass', bypass)