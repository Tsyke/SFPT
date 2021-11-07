const mongoose = require('mongoose');

var voice = new mongoose.Schema({
    userID: String,
    serverID: String,
    channelID: String
});

module.exports = mongoose.model('voice', voice)