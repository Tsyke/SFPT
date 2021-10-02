const AntiSpam = new Map();

module.exports = async(client, message) => {
    var GuildData = await client.GetGuildData(message.guild.id)
    const prefix = GuildData.prefix
    if (!message.author.bot) {

        if (message.content.startsWith(prefix)) {

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            const data = {};
            if (cmd) cmd.execute(client, message, args, data);
        }

    }

    //!Anti-spam
    if (GuildData.AntiSpam === true) {
        client.spam.findOne({ GuildID: message.guild.id, ChannelID: message.channel.id }, async(err, data) => {
            if (err) throw err;

            if (!data) {
                const logs = message.guild.channels.cache.get(GuildData.logs);

                if (AntiSpam.has(message.author.id)) {
                    const Info = AntiSpam.get(message.author.id)
                    AntiSpam.set(message.author.id, Info + 1);
                    if (Info === 5) {
                        if (message.author.id === message.guild.ownerId) {
                            return
                        }
                        message.channel.send({
                            content: `Attention ${message.author}, le spam est interdit au prochain avertissement vous serez kick du serveur.`
                        })
                    }
                    if (Info === 7) {
                        if (message.author.id === message.guild.ownerId) {
                            return message.author.send({
                                content: "SFPT à détécter que vous spammiez dans le channel: " + `<#${message.channel.id}> en tant que propriétaire du serveur il ne va rien vous arriver.\nSi le spam est autorisé dans ce salon, faites la commande \`sfpt.allow-spam add ${message.channel.id}\``
                            })
                        }
                        await logs.send({
                            content: `${message.author} a été kick pour spam.`
                        })
                        await message.channel.send({
                            content: `${message.author} a été kick pour spam.`
                        })
                        message.member.kick("[AUTO] Kick pour spam")
                    }

                } else {
                    AntiSpam.set(message.author.id, 1)
                    setTimeout(() => {
                        AntiSpam.delete(message.author.id)
                    }, 5000)
                }
            }
        })
    }

};