const { Schema, model } = require("mongoose");

var Urg = new Schema({
    userID: String,
    serverID: String,
    botLicense: String
});

module.exports = model('urgence', Urg);