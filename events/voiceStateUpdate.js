const voice = require('../models/guilds/voice');

module.exports = async(client, channel, oldMember, newMember) => {
    var guild = await client.GetGuildData(oldMember.guild.id)

    if (guild.voiceA === true) {
        if (oldMember.channelId) {
            if (oldMember.channelId === `${guild.voice}`) {
                var name;
                name = await client.users.cache.get(oldMember.id);
                var user;
                user = oldMember.id;
                var newVoice = await oldMember.guild.channels.create("Salon de " + `${name.username}`, {
                    type: "GUILD_VOICE",
                    parent: `${oldMember.channel.parentId}`,
                    topic: "Ceci est le salon de logs de SFPT",
                    id: oldMember.guild.id,
                    permissionOverwrites: [{
                        id: oldMember.id,
                        allow: ["MANAGE_CHANNELS"]
                    }]
                })
                oldMember.setChannel(newVoice)
                var voiced = new voice({
                    userID: oldMember.id,
                    serverID: oldMember.guild.id,
                    channelID: newVoice.id
                })
                voiced.save()

            }
        } else if (!oldMember.channelId) {
            var channel = await voice.findOne({ serverID: oldMember.guild.id, userID: oldMember.id })
            if (!channel) return
            var voiceChannel = await client.channels.cache.get(channel.channelID)
            var memberCount = client.channels.cache.get(channel.channelID).members.size;
            if (memberCount <= 0) {
                voiceChannel.delete()
                channel.delete()
            }
        }
    }

}