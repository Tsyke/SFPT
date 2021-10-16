const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "panel",
    aliases: "Aucun",
    permission: "Aucune",

    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {
        const Option = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('raid')
                .setLabel('🚫 Anti-Raid')
                .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('ticket')
                .setLabel('📜 Ticket')
                .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('gen')
                .setLabel('🌎 Général')
                .setStyle('DANGER')
            )

        var StartEmbed;
        StartEmbed = new MessageEmbed()
            .setColor("#d5ff00")
            .setTitle("Bienvenue dans votre panel")
            .setDescription("Que voulez-vous voir ?")
        message.reply({ embeds: [StartEmbed], components: [Option] })
        const filter = i => i.customId === 'close' || "delete" || "trans" && i.user.id !== client.user.id;

        const collector = message.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async i => {
            if (i.customId === 'raid') {
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
                        value: mode[GuildData.raid],
                        inline: true
                    }, {
                        name: "Age-ban",
                        value: mode[GuildData.ageban] + `(${GuildData.agebanTime / 86400000} jours)`,
                        inline: true
                    }, {
                        name: "Anti-bot",
                        value: mode[GuildData.nobot],
                        inline: true
                    }, {
                        name: "Anti-spam",
                        value: mode[GuildData.AntiSpam],
                        inline: true
                    }, {
                        name: "Anti-liens",
                        value: mode[GuildData.antilinks],
                        inline: true
                    }, {
                        name: "Anti-webhook",
                        value: mode[GuildData.webhook],
                        inline: true
                    })

                i.reply({ embeds: [PanelEmbed] })
            } else if (i.customId === "ticket") {
                if (GuildData.ticket === false) return i.reply({ content: "Aucune configuration disponible pour les tickets" })
                var ping = await client.guilds.cache.get(GuildData.guildID).roles.cache.get(GuildData.ticket_ping)
                var TIlogs = await client.guilds.cache.get(GuildData.guildID).channels.cache.get(GuildData.ticket_logs)
                var number = await GuildData.ticket_number
                let roleDoc = await client.GetRoleTicket(message.guild.id)
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
            } else if (i.customId === "gen") {
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
                        value: `${logs}`,
                        inline: true
                    })
                i.reply({ embeds: [PanelEmbed] })
            }
        })
    }
}