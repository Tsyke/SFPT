const { Client } = require('discord.js');

class SFPT extends Client {
    constructor(option) {
        super(option)
        this.config = require('../config.json')
        this.guild = require("../models/guilds/guilds")
        this.spam = require("../models/guilds/allowspam")
        this.role = require('../models/guilds/role')
        this.bot = require("../models/bot/bot")
        this.accountStaff = require('../models/admin/staffAccount')
    }

    async GetGuildData(guildID) {
        if (!guildID) throw new Error("No guild ID provided");
        if (isNaN(guildID)) throw new Error("Guild ID is not a valid number");
        let GuildDoc = await this.guild.findOne({
            guildID
        })
        return GuildDoc;
    }

    async GetAccountData(email) {
        let GuildDoc = await this.accountStaff.findOne({
            email
        })
        return GuildDoc;
    }
    async GetRole() {
        let roledoc = await this.role.find()
        return roledoc
    }
}
module.exports = SFPT;