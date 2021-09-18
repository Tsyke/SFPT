module.exports = async(client, guild) => {
    let everyone = guild.roles.cache.find((x) => x.name == "@everyone")
    const channel = await guild.channels.create("sfpt-logs", {
        type: "channel",
        topic: "",
        id: guild.id,
        permissionOverwrites: [{
            id: everyone.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
        }]
    })
    let guildDoc = await client.guild.findOne({
        guildID: guild.id
    })
    guildDoc = new client.guild({
        guildID: guild.id,
        prefix: 'sfpt.',
        logs: channel.id,
    })
    guildDoc.save()
}