const mongoose = require('mongoose');

var channel = new mongoose.Schema({
    serverID: {
        required: true,
        type: String
    },
    channelName: {
        required: true,
        type: String
    },
    channelTopic: {
        required: true,
        type: String
    },
    channelType: {
        required: true,
        type: String
    },
    channelRowPosition: {
        required: true,
        type: String
    },
    channelnsfwLevel: {
        required: true,
        type: String
    },
    channelParent: {
        required: true,
        type: String
    },
    channelPermission: {
        type: Array,
        required: true
    }

});

module.exports = mongoose.model('raidchannel', channel)