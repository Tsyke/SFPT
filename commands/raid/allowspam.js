const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "allow-spam",
    permission: "MANAGE_MESSAGES",
    owner: false,
    aliases: "Aucun",
    async execute(client, message, args) {
        if (!args[0]) {
            return message.channel.send({
                content: ':x:Paramètres invalide. Usage correct: `sfpt.allow-spam <channelId>`'
            })
        }
        if (args[0] === "add") {
            const salons = message.mentions.channels.first() || args[0];

            if (!message.member.permissions.has(this.permission)) {
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setAuthor('Erreur', message.author.avatarURL())
                        .setDescription('**➥** Vous n\'avez pas la permission d\'ignoré des salons.')
                        .setTimestamp(message.createdAt)
                        .setFooter("By MD★eev#9746")
                        .setColor("RED")
                    ]
                })
            } else if (!args[1]) {
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setAuthor('Erreur', message.author.avatarURL())
                        .setDescription('**➥** Vous devez écrire le salon.')
                        .setTimestamp(message.createdAt)
                        .setFooter("By MD★eev#9746")
                        .setColor("RED")
                    ]
                })
            } else if (!message.guild.channels.cache.get(salons.id || salons)) {
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setAuthor('Erreur', message.author.avatarURL())
                        .setDescription('**➥** Salon non valide.')
                        .setTimestamp(message.createdAt)
                        .setFooter("By MD★eev#9746")
                        .setColor("RED")
                    ]
                })
            }

            if (salons) {
                const channel = message.guild.channels.cache.get(salons.id || salons)
                let spamDoc = await client.spam.findOne({
                    guildID: message.guild.id,
                }).catch(err => console.log(err))
                let detectChannel = await client.spam.findOne({
                    guildID: message.guild.id,
                    ChannelID: [salons.id || salons]
                })
                if (!spamDoc) {
                    spamDoc = new client.spam({
                        guildID: message.guild.id,
                        ChannelID: [salons.id || salons]
                    })
                    return spamDoc.save().then(
                        message.channel.send(`${message.author} a ignoré le salon: ${channel}`)
                    )
                } else if (detectChannel) {
                    return spamDoc.save().then(
                        message.channel.send(`Le salon: ${channel} est déjà enregistré`)
                    )
                } else if (spamDoc) {
                    console.log(spamDoc.ChannelID)

                    spamDoc.ChannelID.push(channel.id)
                    await spamDoc.save().catch(err => console.log(err))
                        .then(
                            message.channel.send(`${message.author} a ignoré le salon: ${channel}`)
                        )
                }
            }
        } else if (args[0] === "list") {


            const spamDoc = await client.spam.findOne({
                guildID: message.guild.id,
            }).catch(err => console.log(err))

            if (!spamDoc || !spamDoc.ChannelID.length) {
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setAuthor('Erreur', message.author.avatarURL())
                        .setDescription(`**➥** Aucun salon enregistré.`)
                        .setTimestamp(message.createdAt)
                        .setFooter("By MD★eev#9746")
                        .setColor("RED")
                    ]
                })
            }

            const data = []

            for (let i = 0; spamDoc.ChannelID.length > i; i++) {
                data.push(`**Salon:** <#${spamDoc.ChannelID[i]}>`)
            }

            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setTitle("Voici les salon ignoré")
                .setDescription(data ? data.join('\n') : "Aucun salon enregistré")

            message.channel.send({ embeds: [embed] })

        }
    },
}