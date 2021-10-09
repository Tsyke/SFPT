const mongoose = require('mongoose');

const Guild = new mongoose.Schema({
    guildID: String,
    prefix: String,
    logs: String,
    captcha: Boolean,
    CaptchaRole: String,
    raid: Boolean,
    ageban: Boolean,
    agebanTime: Number,
    nobot: Boolean,
    AntiSpam: Boolean,
    IgnoreChannel: Array,
    antilinks: Boolean,
    Autorole: Boolean,
    ticket: Boolean,
    ticket_logs: String,
    ticket_ping: String,
    ticket_roles: Array,
    ticket_number: Number
});

module.exports = mongoose.model('guilds', Guild)