const mongoose = require('mongoose');

let role = new mongoose.Schema({
    guildID: String,
    role: String,
})

module.exports = mongoose.model('role', role)