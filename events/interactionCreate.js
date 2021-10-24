const { MessageEmbed, MessageActionRow, MessageButton, Guild } = require('discord.js');


module.exports = async(client, i) => {
    const GuildData = await client.GetGuildData(i.guild.id)
    var data = [];
    var prefix = GuildData.prefix;
    var logs = GuildData.logs;
    if (i.isButton()) {
        var open;
        open = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('ticketopen')
                .setLabel('Open ticket')
                .setStyle('SUCCESS')
            )
        const valid = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('ticketyes')
                .setLabel('OUI')
                .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('ticketno')
                .setLabel('NON')
                .setStyle('SUCCESS'),
            )
        const channel = await i.guild.channels.cache.find(channel => channel.name === "tickets-logs");
        if (i.customId === "ticketclose") {
            channel.permissionOverwrites.edit(i.member.user, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: false,
            })
            i.reply({ content: "Ticket fermé", components: [open] })
        }
        if (i.customId === "trans") {
            i.channel.messages.fetch().then(async(messages) => {
                const sourcebin = require('sourcebin_js');
                const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('fr-EU')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
                var data;
                data = [];
                messages.forEach(m => {
                    data.push(`${new Date(m.createdAt).toLocaleString('fr-EU')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`)
                });
                let response;

                response = await sourcebin.create([{
                    name: ' ',
                    content: output,
                    languageId: 'text',
                }, ], {
                    title: `Transcription du ticket: ${channel.name}`,
                    description: ' ',
                });


                const trans = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Ouvrir la transcription')
                        .setStyle('LINK')
                        .setURL(response.url)
                    )

                const embed = new MessageEmbed()
                    .setDescription(`Voici votre transcritpion`)
                    .setColor('GREEN');

                i.reply({ embeds: [embed], components: [trans] });
            });
        }
        if (i.customId === 'ticketdelete') {
            var embed = new MessageEmbed()
                .setDescription(`Êtes-vous sur de vouloir supprimer le ticket définitivement ?`)
                .setColor('RED')
            i.reply({ embeds: [embed], components: [valid] })
        }
        if (i.customId === 'ticketno') {
            i.reply({ content: "Annulé" })
        }
        if (i.customId === 'ticketyes') {
            var DeleteT = new MessageEmbed()
                .setDescription(`✅ Ticket fermé: ${i.channel.name}`)
                .setColor('GREEN');
            channel.send({ embeds: [DeleteT] })
            i.channel.delete();
        }
        if (i.customId === 'ticketopen') {
            channel.permissionOverwrites.edit(i.member.user, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
            });
            i.reply({ content: "Ticket ouvert" })

        }
        //! Fin ticket
        //!Panel
        if (i.customId === 'Panelraid') {
            var mode = {
                true: "<:on:898618163221135430> Actif",
                false: "<:off:898618152647262248> Désactivé"
            }
            var PanelEmbed = new MessageEmbed()
                .setColor("#0066ff")
                .setTitle("Bienvenue dans votre panel Anti-raid")
                .setDescription("Ci-dessous vous allez appercevoir les différentes fonctionnalitées, activé ou non.")
                .addFields({
                    name: "RaidMode",
                    value: `${mode[GuildData.raid]}`,
                    inline: true
                }, {
                    name: "Age-ban",
                    value: mode[GuildData.ageban] + ` (${GuildData.agebanTime / 86400000} jours)`,
                    inline: true
                }, {
                    name: "Anti-bot",
                    value: `${mode[GuildData.nobot]}`,
                    inline: true
                }, {
                    name: "Anti-spam",
                    value: `${mode[GuildData.AntiSpam]}`,
                    inline: true
                }, {
                    name: "Anti-liens",
                    value: `${mode[GuildData.antilinks]}`,
                    inline: true
                }, {
                    name: "Anti-webhook",
                    value: `${mode[GuildData.webhook]}`,
                    inline: true
                })

            i.reply({ embeds: [PanelEmbed] })
        } else if (i.customId === "Panelticket") {
            if (GuildData.ticket === false) return i.reply({ content: "Aucune configuration disponible pour les tickets" })
            var ping = await client.guilds.cache.get(GuildData.guildID).roles.cache.get(GuildData.ticket_ping)
            var TIlogs = await client.guilds.cache.get(GuildData.guildID).channels.cache.get(GuildData.ticket_logs)
            var number = await GuildData.ticket_number
            let roleDoc = await client.GetRoleTicket(i.guild.id)
            roleDoc.forEach((role) => {
                data.push(`<@&${role.role}>`)
            })
            var mode = {
                true: "<:on:898618163221135430> Actif",
                false: "<:off:898618152647262248> Désactivé"
            }
            var PanelEmbed = new MessageEmbed()
                .setColor('#00ff2b')
                .setTitle("Bienvenue dans votre panel Ticket")
                .setDescription("Ci-dessous vous allez appercevoir la rétrospéctive de la configuration du ticket.")
                .addFields({
                    name: "Statut",
                    value: mode[GuildData.ticket]
                }, {
                    name: "Logs",
                    value: TIlogs ? `${TIlogs}` : ":warning: Erreur de logs",
                    inline: true
                }, {
                    name: "Ping ticket",
                    value: ping ? `${ping}` : ":warning: Erreur de ping",
                    inline: true
                }, {
                    name: "Nombre de ticket ouvert",
                    value: number ? `${number}` : ":warning: Erreur de tickets",
                    inline: true
                }, {
                    name: "Rôles ayant accès aux tickets",
                    value: data.join(', '),
                    inline: true
                })
            i.reply({ embeds: [PanelEmbed] })
        } else if (i.customId === "Panelgen") {
            var FinalLogs = await client.channels.cache.get(logs)
            if (!FinalLogs) FinalLogs = ":warning: Erreur de logs"
            var PanelEmbed = new MessageEmbed()
                .setColor('#ff0004')
                .setTitle("Bienvenue dans votre panel général du serveur")
                .setDescription("Ci-dessous vous allez appercevoir la rétrospéctive de la configuration du serveur.")
                .addFields({
                    name: "Nom du serveur",
                    value: `${i.guild.name}`
                }, {
                    name: "ID du serveur",
                    value: `${i.guild.id}`,
                    inline: true
                }, {
                    name: "Prefix actuelle",
                    value: "`" + `${prefix}` + "`\nCommande de récupérations de prefix en cas d'oublie: @sfptprefix",
                    inline: true
                }, {
                    name: "Logs",
                    value: `${FinalLogs}`,
                    inline: true
                })
            i.reply({ embeds: [PanelEmbed] })
        } else if (i.customId === "rsavalid") {
            if (i.member.id !== '401067518774476800') {
                var msg = await i.reply({ content: `${i.member}, vous n'êtes pas authorisé à faire ceci.` })
                return // await setTimeout(function() {
                //     msg.delete()
                // }, 2000)
            }
            var embed = new MessageEmbed()
                .setDescription(`${i.member} à terminé l'annonce !`)
                .setColor("BLUE")
            i.message.edit({ content: " ", embeds: [embed] })
        }
    }
}