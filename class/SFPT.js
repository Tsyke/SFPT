const { Client } = require('discord.js');

class SFPT extends Client {
    constructor(option) {
        super(option)
        this.guild = require("../models/guilds/guilds")
    }

    async GetGuildData(guildID) {
        if (!guildID) throw new Error("No guild ID provided")
        if (isNaN(guildID)) throw new Error("Guild ID is not a valid number")
        let GuildDoc = await this.guild.findOne({
            guildID
        })
        return GuildDoc;
    }
}
module.exports = SFPT;