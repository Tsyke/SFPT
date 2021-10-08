const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { db } = require('../../models/guilds/guilds');


module.exports = {
    name: "ticket",
    aliases: 'Aucun',
    permission: "MANAGE_MESSAGES",

    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {
        var guildDoc;
        guildDoc = GuildData
        var option;
        option = args[0];
        var TLogs;
        TLogs = await message.guild.channels.cache.find(channel => channel.name === "tickets-logs");
        if (!TLogs) TLogs = logs
        if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Argument possible: \`"create" || "set" || "role" || "config" || "close" || "add" || "remove"\`` }, message)
        if (option) {
            if (option === "config") {
                option = args[1];
                if (guildDoc.ticket === true) return message.reply({ content: "Système de ticket déjà configuré" })
                if (guildDoc) {
                    let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")
                    const channel = await message.guild.channels.create("tickets-logs", {
                        type: "channel",
                        topic: "Ceci est le salon de logs-tickets de SFPT",
                        id: message.guild.id,
                        permissionOverwrites: [{
                            id: everyone.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                        }]
                    })
                    guildDoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ticket: true } })
                    guildDoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ticket_logs: channel.id } })
                    var embed = new MessageEmbed()
                        .setDescription(`✅ Ticket configuré`)
                        .setColor('GREEN')
                    var LogsEmbed = new MessageEmbed()
                        .setTitle('[CONFIGURATION] Ticket')
                        .setDescription(`Ticket configuré`)
                        .addField('Modérateur:', `${message.author}`)
                        .setColor('GREEN')
                    logs.send({ embeds: [LogsEmbed] })
                    message.reply({ embeds: [embed] })
                }
            } else if (option === "set") {
                option = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                if (!option) return message.reply({ content: "Erreur, rôle manquant" })
                if (GuildData) {
                    let createRole = await client.Ticketrole.findOne({
                        guildID: message.guild.id,
                        role: option.id || option
                    })

                    if (createRole) {
                        return message.reply({ content: "Rôle déjà configuré" })
                    }
                    if (!createRole) {
                        createRole = new client.Ticketrole({
                            guildID: message.guild.id,
                            role: option.id
                        })
                        createRole.save()
                        var embed = new MessageEmbed()
                            .setDescription(`✅ Rôle configuré`)
                            .setColor('GREEN')
                        var LogsEmbed = new MessageEmbed()
                            .setTitle('[CONFIGURATION] Ticket')
                            .setDescription(`Rôle configuré`)
                            .addField('Role:', `${option}`)
                            .addField('Modérateur:', `${message.author}`)
                            .setColor('GREEN')
                        logs.send({ embeds: [LogsEmbed] })
                        message.reply({ embeds: [embed] })
                    }

                } else return client.Error({ type: 'db', error: "Impossible de trouver le serveur dans la base de donnée" }, message)

            } else if (option === "list") {
                var embed = new MessageEmbed()
                let roleDoc = await client.GetRoleTicket(message.guild.id)
                roleDoc.forEach((role) => {
                    data.push(`<@&${role.role}>`)
                })
                embed.setTitle('Rôle ticket')
                embed.setDescription(data.join(', '))
                return message.channel.send({
                    embeds: [embed]
                })
            } else if (option === "remove") {
                option = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                if (!option) {
                    return message.channel.send({
                        content: ":x:Rôle non présent"
                    })
                }
                let createRole = await client.Ticketrole.findOne({
                    guildID: message.guild.id,
                    role: option.id || option
                })
                if (!createRole) {
                    return message.channel.send({
                        content: ":x:Rôle non présent dans la liste"
                    })
                }
                if (createRole) {
                    createRole.delete()
                    var embed = new MessageEmbed()
                        .setDescription(`✅ Rôle déconfiguré`)
                        .setColor('GREEN')
                    var LogsEmbed = new MessageEmbed()
                        .setTitle('[CONFIGURATION] Ticket')
                        .setDescription(`Rôle déconfiguré`)
                        .addField('Role:', `${option}`)
                        .addField('Modérateur:', `${message.author}`)
                        .setColor('GREEN')
                    logs.send({ embeds: [LogsEmbed] })
                    message.reply({ embeds: [embed] })
                }
            } else if (option === "create") {
                const Option = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('delete')
                        .setLabel('Delete ticket')
                        .setStyle('SUCCESS'),
                    )
                    .addComponents(
                        new MessageButton()
                        .setCustomId('trans')
                        .setLabel('Transcript ticket')
                        .setStyle('SECONDARY'),
                    )
                    .addComponents(
                        new MessageButton()
                        .setCustomId('close')
                        .setLabel('Close ticket')
                        .setStyle('DANGER')
                    )

                var open;
                open = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('open')
                        .setLabel('Open ticket')
                        .setStyle('SUCCESS')
                    )
                const valid = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('yes')
                        .setLabel('OUI')
                        .setStyle('DANGER'),
                    )
                    .addComponents(
                        new MessageButton()
                        .setCustomId('no')
                        .setLabel('NON')
                        .setStyle('SUCCESS'),
                    )

                var reason;
                reason = args.join(' ').replace("create ", "");
                if (reason) object = { userID: message.author.id, reason: reason }
                let name = await `${message.author.username.toLowerCase()}-ticket`;
                let channel = await message.guild.channels.cache.find(channel => channel.name === name);
                if (channel) return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`:x: ${message.author} vous avez déjà un ticket d'ouvert: ${channel} `)
                        .setColor('GREEN')
                    ]
                })
                else if (!channel) {
                    let roleDoc = await client.GetRoleTicket(message.guild.id)
                    var configRole;

                    let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")
                    const channel = await message.guild.channels.create(`${message.author.username}-ticket`, {
                        type: "channel",
                        topic: object.reason,
                        id: message.guild.id,
                        permissionOverwrites: [{
                                id: message.author.id,
                                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                            },
                            {

                                id: everyone.id,
                                deny: ['VIEW_CHANNEL'],
                            }
                        ]
                    })
                    await roleDoc.forEach((role) => {
                        channel.permissionOverwrites.edit(role.role, {
                            VIEW_CHANNEL: true,
                            SEND_MESSAGES: true,
                            ATTACH_FILES: true,
                            READ_MESSAGE_HISTORY: true,
                        })
                    })
                    var CreateEmbed = new MessageEmbed()
                        .setDescription(`✅ Ticket crée: ${channel}`)
                        .setColor('GREEN')

                    message.reply({ embeds: [CreateEmbed] });
                    TLogs.send({ embeds: [CreateEmbed] })

                    var TicketEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
                        .setDescription(`Nouveau ticket ouvert:\nUtilisateur: ${message.author}\nID: ${object.userID}\nRaison: ${object.reason}`)
                    channel.send({ embeds: [TicketEmbed], components: [Option] })
                    const filter = i => i.customId === 'close' || "delete" || "trans" && i.user.id !== client.user.id;

                    const collector = channel.createMessageComponentCollector({ filter });

                    collector.on('collect', async i => {
                        if (i.customId === 'delete') {
                            //!Faire un double collect, (Êtes-vous sur de vouloir supprimé le ticket ?)
                            var embed = new MessageEmbed()
                                .setDescription(`Êtes-vous sur de vouloir supprimer le ticket définitivement ?`)
                                .setColor('RED')
                            i.reply({ embeds: [embed], components: [valid] })
                            const filter = i => i.customId === 'yes' || "no" && i.user.id !== client.user.id;

                            const collector = channel.createMessageComponentCollector({ filter });
                            collector.on('collect', async i => {
                                if (i.customId === 'no') {
                                    i.reply({ content: "Annulé" })
                                }
                                if (i.customId === 'yes') {
                                    var DeleteT = new MessageEmbed()
                                        .setDescription(`✅ Ticket fermé: ${channel.name}`)
                                        .setColor('GREEN');
                                    TLogs.send({ embeds: [DeleteT] })
                                    channel.delete();
                                }
                            })
                        }
                        if (i.customId === "close") {
                            channel.permissionOverwrites.edit(message.member.user, {
                                VIEW_CHANNEL: false,
                                SEND_MESSAGES: false,
                                ATTACH_FILES: false,
                                READ_MESSAGE_HISTORY: false,
                            })
                            i.reply({ content: "Ticket fermé", components: [open] })
                            const filter = i => i.customId === "open" && i.user.id !== client.user.id;

                            const collector = channel.createMessageComponentCollector({ filter });
                            collector.on('collect', async i => {
                                if (i.customId === 'open') {
                                    channel.permissionOverwrites.edit(message.member.user, {
                                        VIEW_CHANNEL: true,
                                        SEND_MESSAGES: true,
                                        ATTACH_FILES: true,
                                        READ_MESSAGE_HISTORY: true,
                                    });
                                    i.reply({ content: "Ticket ouvert" })
                                }

                            })
                        }
                        if (i.customId === "trans") {
                            channel.messages.fetch().then(async(messages) => {
                                const sourcebin = require('sourcebin_js');

                                console.log("Message: OK")
                                const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('fr-EU')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

                                let response;

                                response = await sourcebin.create([{
                                    name: ' ',
                                    content: output,
                                    languageId: 'text',
                                }, ], {
                                    title: `Transcription du ticket: ${channel.name}`,
                                    description: ' ',
                                });

                                console.log("Message: OK")

                                const trans = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                        .setLabel('Ouvrir la transcription')
                                        .setStyle('LINK')
                                        .setURL(response.url)
                                    )
                                console.log("Message: OK")

                                const embed = new MessageEmbed()
                                    .setDescription(`Voici votre transcritpion`)
                                    .setColor('GREEN');
                                console.log("Message: OK")

                                i.reply({ embeds: [embed], components: [trans] });
                            });
                        };
                    });
                };
            };
        };
    },
};