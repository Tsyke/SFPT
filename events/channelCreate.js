const { MessageEmbed } = require('discord.js')
module.exports = async(client, channel) => {
    var raid = await client.RaidModePassif(channel.guild.id)
    var GuildData = await client.GetGuildData(channel.guild.id)
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    console.log(month)
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let datee = date + "/" + month + "/" + year + " à: " + hours + "h" + minutes
    if (GuildData.raid === "passif") {
        if (GuildData.passif === false || !GuildData.passif) {
            if (channel) {
                if (!raid) {
                    raid = new client.raid({
                        serverID: channel.guild.id,
                        channelname: channel.name,
                        date: datee
                    })
                    raid.save()
                    setTimeout(async() => {
                        var raide;
                        raide = await client.RaidModePassif(channel.guild.id)
                        raide.delete()
                    }, 50000);
                } else if (raid && raid.channelname === channel.name) {
                    const channelDeleteId = channel.id;
                    channel.guild.fetchAuditLogs({ 'type': 'CHANNEL_CREATE' })
                        .then(logs => logs.entries.find(entry => entry.target.id == channelDeleteId))
                        .then(async(entry) => {
                            author = entry.executor;
                            if (author.id === client.user.id) return
                            if (author.id === channel.guild.ownerId) return
                            var startEmbed = new MessageEmbed()
                                .setTitle('[URGENCE] :warning: RaidMode passif actif')
                                .setDescription(":warning: Le raidmode s'est déclancher automatiquement car un raid est en train de se produire")
                                .setColor("#ff0000")
                                .addFields({
                                    name: ":warning: Date de commencement:",
                                    value: datee,
                                    inline: true
                                })
                            var logs;
                            logs = channel.guild.channels.cache.get(GuildData.logs);
                            if (logs) {
                                await logs.send({ content: ":warning: @everyone" })
                                await logs.send({ embeds: [startEmbed] })
                            }
                            GuildData = await client.guild.findOneAndUpdate({ guildID: channel.guild.id }, { $set: { passif: true } })
                            channel.delete()
                            console.log(`channel ${channel.name} create by ${author.tag}`);
                        })
                    setTimeout(() => {

                    }, 60000 * 5)
                }
            }
        } else if (GuildData.passif === true) {
            if (channel) {
                channel.delete()
            }
        }
    }

}