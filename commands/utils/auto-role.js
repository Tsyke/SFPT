const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autorole",
    desc: "Active ou désactive l'autorole",
    permission: "ADMINISTRATOR",
    category: "Modération",
    aliases: 'Aucun',

    async execute(client, message, args) {
        if (!message.member.permissions.has(this.permission)) return message.channel.send({
            content: "Non authorisé"
        })

        var option;
        option = args[0];

        let guildDoc = await client.guild.findOne({
            guildID: message.guild.id
        })

        var Logs;
        Logs = message.guild.channels.cache.get(guildDoc.logs)

        if (!option) {
            return message.channel.send({
                content: ":x: Erreur 404 (Not Found)\nMode disponible: enable/disable/config"
            })
        }
        if (option === "enable") {
            if (guildDoc.Autorole === true) {
                return message.channel.send({
                    content: ":x: Autorole déjà actif."
                })
            }
            guildDoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { Autorole: true } })
            message.channel.send({
                content: "✅ Autorole actif."
            })
            if (!Logs) {
                message.channel.send({
                    content: ":warning: Erreur de logs"
                })
            }
            var embed = new MessageEmbed()
                .setTitle(`[Modification] Autorole`)
                .setColor("GREEN")
                .addFields({
                    name: 'Modérateur:',
                    value: `${message.author}`,
                    inline: true
                }, {
                    name: 'Mode:',
                    value: `Définie sur actif`,
                    inline: true
                })
            Logs.send({
                embeds: [embed]
            })

        }
        if (option === "disable") {
            if (guildDoc.Autorole === false) {
                return message.channel.send({
                    content: ":x: Autorole déjà inactif."
                })
            }
            guildDoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { Autorole: false } })
            message.channel.send({
                content: "✅ Autorole inactif."
            })
            if (!Logs) {
                message.channel.send({
                    content: ":warning: Erreur de logs"
                })
            }
            var embed = new MessageEmbed()
                .setTitle(`[Modification] Autorole`)
                .setColor("GREEN")
                .addFields({
                    name: 'Modérateur:',
                    value: `${message.author}`,
                    inline: true
                }, {
                    name: 'Mode:',
                    value: `Définie sur inactif`,
                    inline: true
                })
            Logs.send({
                embeds: [embed]
            })
        }
        if (option === "config") {
            option = args[1];
            if (!option) {
                return message.channel.send({
                    content: ":x: Erreur 404 (Not Found)\nMode disponible: add/remove/list"
                })
            }
            if (option === "add") {
                option = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!option) {
                    return message.channel.send({
                        content: ":x: Erreur 404 (Not Found)\nRôle manquant ou invalide"
                    })
                }
                if (option) {
                    let createRole = await client.role.findOne({
                        guildID: message.guild.id,
                        role: option.id
                    })

                    if (createRole) {
                        return message.channel.send({
                            content: ":x: Erreur 401 (Unauthorized)\nRôle déjà présent dans la liste"
                        })
                    }

                    if (!createRole) {
                        createRole = new client.role({
                            guildID: message.guild.id,
                            role: option.id
                        })
                        var embeds = new MessageEmbed()
                            .setTitle(`[Modification] Autorole`)
                            .setColor("GREEN")
                            .addFields({
                                name: 'Modérateur:',
                                value: `${message.author}`,
                                inline: true
                            }, {
                                name: 'Rôle:',
                                value: `Ajout de ${option.name}`,
                                inline: true
                            })
                        createRole.save()
                        guildDoc.save()
                        return message.channel.send({
                            content: "✅ Nouveau rôle enregistré: " + "`" + option.name + "`"
                        }).then(
                            Logs.send({
                                embeds: [embeds]
                            })
                        )

                    }
                }
            }
            if (option === "remove") {
                option = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
                if (!option) {
                    return message.channel.send({
                        content: ":x: Erreur 401 (Unauthorized)\nRôle non présent"
                    })
                }
                let createRole = await client.role.findOne({
                    guildID: message.guild.id,
                    role: option.id
                })
                if (!createRole) {
                    return message.channel.send({
                        content: ":x: Erreur 401 (Unauthorized)\nRôle non présent dans la liste"
                    })
                }
                if (createRole) {
                    createRole.delete()
                    var embeds = new MessageEmbed()
                        .setTitle(`[Modification] Autorole`)
                        .setColor("GREEN")
                        .addFields({
                            name: 'Modérateur:',
                            value: `${message.author}`,
                            inline: true
                        }, {
                            name: 'Rôle:',
                            value: `Suppression de ${option.name}`,
                            inline: true
                        })
                    return message.channel.send({
                        content: "✅ Rôle supprimé: " + "`" + option.name + "`"
                    }).then(
                        Logs.send({
                            embeds: [embeds]
                        })
                    )
                }
            }
            if (option === "list") {
                var embed = new MessageEmbed()
                const data = []

                let roleDoc = await client.GetRole(message.guild.id)
                roleDoc.forEach((role) => {
                    data.push(`<@&${role.role}>`)
                })
                embed.setTitle('Rôle autorole')
                embed.setDescription(data.join(', '))
                return message.channel.send({
                    embeds: [embed]
                })
            }
        }

    },
}