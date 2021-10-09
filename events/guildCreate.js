module.exports = async(client, guild) => {
    let everyone = guild.roles.cache.find((x) => x.name == "@everyone")
    let sfpt = guild.roles.cache.find((x) => x.name == "SFPT")
    const channel = await guild.channels.create("sfpt-logs", {
        type: "channel",
        topic: "Ceci est le salon de logs de SFPT",
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
        prefix: "sfpt.",
        logs: channel.id,
        captcha: false,
        CaptchaRole: guild.id,
        raid: false,
        ageban: false,
        agebanTime: 0,
        nobot: false,
        AntiSpam: false,
        antilinks: false,
        Autorole: false,
        ticket: false,
        ticket_roles: [sfpt.id],
        ticket_number: 0,
        ticket_ping: "",
        UserSend: false,
        channel_wlc: "undefined",
        channel_bye: "undefined",
        image_url: "https://cdn.discordapp.com/attachments/842485964417138728/864488271392276530/bg.png"

    })
    guildDoc.save()
}