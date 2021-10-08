const AntiSpam = new Map();
const { MessageEmbed } = require('discord.js')
module.exports = async(client, message) => {

    if (message.channel.id == "893980732127580180" && message.author.id == "893979514848280637" && message.content == "!!ping") {
        message.channel.send("...")
            .then((m) => {
                m.edit(`Bot:${m.createdTimestamp - message.createdTimestamp}\nAPI:${client.ws.ping}`);
            });
    }
    var GuildData = await client.GetGuildData(message.guild.id)

    var logs;
    logs = message.guild.channels.cache.get(GuildData.logs);

    var DBError;
    DBError = client.DBError

    const prefix = GuildData.prefix
    if (!message.author.bot) {

        if (message.content.startsWith(prefix)) {

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            const data = [];
            const object = {};
            const guild = message.guild;
            if (cmd) cmd.execute(client, message, args, prefix, data, object, guild, logs, GuildData);
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

    //! Anti-links
    if (GuildData.antilinks === true && !message.member.permissions.has("ADMINISTRATOR")) {
        var embed;
        embed = MessageEmbed;

        var msg;
        msg = message.content;

        var AlertMemberEmbed;
        AlertMemberEmbed = new embed()
            .setTitle("Anti-liens")
            .setDescription(':warning: Les liens sont interdit sur ce serveur !')
            .setColor("BLUE")

        var LogsEmbed;
        LogsEmbed = new embed()
            .setTitle('[ALERTE] Anti-links')
            .setDescription(`${message.author} a mis un lien.`)
            .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
            .setColor('RED')

        if (msg.startsWith('http')) {
            message.delete(),
                logs.send({ embeds: [LogsEmbed] }),
                message.author.send({ embeds: [AlertMemberEmbed] })
        } else if (msg.includes("http")) {
            message.delete(),
                logs.send({ embeds: [LogsEmbed] }),
                message.author.send({ embeds: [AlertMemberEmbed] })
        } else if (msg.startsWith("discord.gg/")) {
            message.delete(),
                logs.send({ embeds: [LogsEmbed] }),
                message.author.send({ embeds: [AlertMemberEmbed] })
        } else if (msg.includes("discord.gg/")) {
            message.delete(),
                logs.send({ embeds: [LogsEmbed] }),
                message.author.send({ embeds: [AlertMemberEmbed] })
        }

    }

};