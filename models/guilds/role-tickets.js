const mongoose = require('mongoose');

let Ticket = new mongoose.Schema({
    guildID: String,
    role: String,
})

module.exports = mongoose.model('Ticket-role', Ticket)