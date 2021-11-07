const { MessageEmbed } = require('discord.js');
const { License } = require('tokeylic-gen');
module.exports = {
        name: "urgence",
        permission: "ADMINISTRATOR",

        async execute(client, message, args) {
            var Key = args.join(' ')
            var urg = await client.urgence.findOne({
                botLicense: Key
            })
            if (!urg) { return message.reply({ content: "<:off:898618152647262248> | License SFPT invalide." }) }
            if (urg) {
                if (urg.userID !== message.author.id) {
                    return message.reply({ content: "<:off:898618152647262248> | Cette clé ne vous appartient pas." })
                } else if (urg.userID === message.author.id) {
                    if (urg.serverID !== message.guild.id) {
                        return message.reply({ content: "<:off:898618152647262248> | Cette clé vous appartient mais ne correspond pas à ce serveur" })
                    } else if (urg.serverID === message.guild.id) {
                        var msg = await message.reply({ content: "<:passif:906545092486111302> | Envoie de la requête à l'équipe SFPT en cours..." })
                        var guild;
                        var channel;
                        var embed;
                        var invite = await message.channel.createInvite({ maxAge: 0, maxUses: 0 });
                        var owner = await message.guild.members.cache.get(message.guild.ownerId)
                        await (
                            guild = await client.guilds.cache.get("893915741789782067"),
                            channel = guild.channels.cache.get('906967781466071071'),
                            embed = new MessageEmbed()
                            .setTitle("Un serveur à activé le mode Urgence")
                            .setDescription("Cliqué sur le lien ci-dessous pour les aider.")
                            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
                            .addField("Infomation du serveur:", "\u200b", false)
                            .addField("Nom du serveur:", `${message.guild.name}`, true)
                            .addField("Owner:", `${owner} (**${owner.user.tag}**) [${owner.id}]`, true)
                            .addField("Utilisateur qui a déclancher le mode:", `${message.author} (**${message.author.tag}**)`, true)
                            .addField("Nombre de membres:", `${message.guild.memberCount > 1 ? message.guild.memberCount + "membres" : `${message.guild.memberCount} membre`}`, true)
                            .addField("\u200b", `\u200b`, false)
                            .addField("Bot License:", `${Key}`, false)
                            .addField("\u200b", `\u200b`, false)
                            .addField("Invitation", `https://discord.gg/${invite.code}`, false)
                            .setColor("RED")
                            .setFooter("SFPT® 2021"),
                        channel.send({ content:"<@&906981099949924404>", embeds: [embed] })
                    )
                    await msg.edit({content:"<:on:898618163221135430> | L'équipe SFPT a reçu la notification de votre urgence."})
                }
            }
        }
    }
}