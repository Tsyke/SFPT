const { MessageEmbed } = require('discord.js')

module.exports = async(client, channel) => {
    if (channel) {
        var GuildData = await client.GetGuildData(channel.guild.id)
        if (GuildData.raid === "passif") {
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            console.log(month)
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let datee = date + "/" + month + "/" + year + " à: " + hours + "h" + minutes
            var raid = await client.RaidModePassif(channel.guild.id)
            if (!raid) {
                if (message.author.id === client.user.id || message.author.id === message.guild.ownerId) return
                raid = new client.raid({
                    serverID: channel.guild.id,
                    channeldelete: 1,
                    date: datee
                })
                raid.save()
                setTimeout(async() => {
                    var raide;
                    raide = await client.RaidModePassif(channel.guild.id)
                    raide.delete()
                }, 1000);
            } else if (raid) {
                await channel.clone()
                const channelDeleteId = channel.id;
                channel.guild.fetchAuditLogs({ 'type': 'CHANNEL_DELETE' })
                    .then(logs => logs.entries.find(entry => entry.target.id == channelDeleteId))
                    .then(async(entry) => {
                        author = entry.executor;
                        if (author.id === client.user.id) return
                        if (author.id === channel.guild.ownerId) return
                        var user = client.guilds.cache.get(channel.guild.id).members.cache.get(author.id)
                        user.ban({
                            reason: `Raid`
                        })
                        console.log(`channel ${channel.name} deleted by ${author.tag}`);

                        var startEmbed = new MessageEmbed()
                            .setTitle('[URGENCE] :warning: RaidMode passif actif')
                            .setDescription(":warning: Le raidmode s'est déclancher automatiquement car un raid est en train de se produire")
                            .setColor("#ff0000")
                            .addFields({
                                name: ":warning: Date de commencement:",
                                value: datee,
                                inline: true
                            }, {
                                name: 'Utilisateur:',
                                value: `${author}`
                            })
                        var logs;
                        logs = channel.guild.channels.cache.get(GuildData.logs);
                        if (logs) {
                            await logs.send({ content: ":warning: @everyone" })
                            await logs.send({ embeds: [startEmbed] })
                        }
                        GuildData = await client.guild.findOneAndUpdate({ guildID: channel.guild.id }, { $set: { passif: true } })

                    })
            }
            if (GuildData.passif === true) {
                await channel.clone()
            }

        }
    }
}