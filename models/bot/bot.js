const mongoose = require('mongoose');

let statut = new mongoose.Schema({
    bot: String,
    statut: String,
    commandsUsed: Number
})

module.exports = mongoose.model('statut', statut)