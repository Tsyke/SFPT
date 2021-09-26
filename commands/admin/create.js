module.exports = {
    name: "data",

    async execute(client, message, args) {
        if (message.author.id !== "805514364277882901") return
        var guild = args[0];
        if (!args[0]) {
            return message.reply({ content: "No guild id provided" })
        }
        let guildDoc = await client.guild.findOne({
            guildID: message.guild.id
        })
        let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")
        const channel = await message.guild.channels.create("sfpt-logs", {
            type: "channel",
            topic: "Ceci est le salon de logs de SFPT",
            id: message.guild.id,
            permissionOverwrites: [{
                id: everyone.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
            }]
        })
        guildDoc = new client.guild({
            guildID: guild,
            prefix: "sfpt.",
            logs: channel.id
        })
        await guildDoc.save()
        message.reply({ content: "Server DataBase create" })
    }
}