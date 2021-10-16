const { MessageEmbed, MessageActionRow, MessageButton, Guild } = require('discord.js');
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
        if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Argument possible: \`"create" || "set" || "config" || "remove"\`` }, message)
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
                        .setCustomId('ticketdelete')
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
                        .setCustomId('ticketclose')
                        .setLabel('Close ticket')
                        .setStyle('DANGER')
                    )



                var reason;
                reason = args.join(' ').replace("create ", "");
                if (reason) object = { userID: message.author.id, reason: reason }
                let topic = await `${object.userID}`;
                let channel = await message.guild.channels.cache.find(channel => channel.topic === topic);
                if (channel) return message.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`:x: ${message.author} vous avez déjà un ticket d'ouvert: ${channel} `)
                        .setColor('GREEN')
                    ]
                })
                else if (!channel) {
                    let roleDoc = await client.GetRoleTicket(message.guild.id)
                    var configRole;
                    GuildData.ticket_number++
                        await GuildData.save()
                    let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")
                    const channel = await message.guild.channels.create(`ticket-${GuildData.ticket_number}`, {
                        type: "channel",
                        topic: object.userID,
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
                    var role;
                    role = message.guild.roles.cache.get(GuildData.ticket_ping)
                    if (!role) {} else {
                        channel.send({ content: `${role}` })
                    }

                    var TicketEmbed = new MessageEmbed()
                        .setColor('GREEN')
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
                        .setDescription(`Nouveau ticket ouvert:\nUtilisateur: ${message.author}\nID: ${object.userID}\nRaison: ${object.reason}`)
                    channel.send({ embeds: [TicketEmbed], components: [Option] })
                };
            } else if (option === "ping") {
                if (args[1] === "none") {
                    GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ticket_ping: " " } })
                    var embed = new MessageEmbed()
                        .setDescription(`✅ Ping retiré`)
                        .setColor('GREEN')
                    var LogsEmbed = new MessageEmbed()
                        .setTitle('[CONFIGURATION] Ping')
                        .setDescription(`Ping retiré`)
                        .addField('Modérateur:', `${message.author}`)
                        .setColor('GREEN')
                    logs.send({ embeds: [LogsEmbed] })
                    message.reply({ embeds: [embed] })
                } else {
                    option = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                    if (!option) return message.reply({ content: "Erreur, rôle manquant (pour retiré le ping, faites sfpt.ticket ping none" })

                    GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { ticket_ping: option.id || option } })

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
            }
        };
    },
};