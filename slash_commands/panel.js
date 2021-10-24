const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'panel',
    description: 'Afficher le panel',
    commandOptions: [],
    async execute(interaction) {
        const Option = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('Panelraid')
                .setLabel('🚫 Anti-Raid')
                .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('Panelticket')
                .setLabel('📜 Ticket')
                .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('Panelgen')
                .setLabel('🌎 Général')
                .setStyle('DANGER')
            )

        var StartEmbed;
        StartEmbed = new MessageEmbed()
            .setColor("#d5ff00")
            .setTitle("Bienvenue dans votre panel")
            .setDescription("Que voulez-vous voir ?")
            // message.reply({ embeds: [StartEmbed], components: [Option] })
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [StartEmbed],
                    components: [Option]
                }
            }
        })
    },
};