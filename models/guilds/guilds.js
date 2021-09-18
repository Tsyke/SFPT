const mongoose = require('mongoose');

const Guild = new mongoose.Schema({
    guildID: String,
    prefix: String,
    logs: String
});

module.exports = mongoose.model('guilds', Guild)