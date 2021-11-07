const mongoose = require('mongoose');

var RaidModel = new mongoose.Schema({
    serverID: String,
    channelname: {
        type: String,
        required: false
    },
    channeldelete: {
        type: Number,
        required: false
    },
    msg: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    date: String
});

module.exports = mongoose.model('raidmodePassif', RaidModel);