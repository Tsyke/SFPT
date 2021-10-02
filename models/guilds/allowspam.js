const mongoose = require('mongoose')

const AllowSpam = mongoose.Schema({

    guildID: String,
    ChannelID: Array,

})

module.exports = mongoose.model('allowspam', AllowSpam)