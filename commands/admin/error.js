const { MessageEmbed, MessageActionRow, MessageButton, Guild } = require('discord.js');



module.exports = {
    name: "error",

    async execute(client, message, args) {
        const filter = i => i.customId === 'btn1' || "delete" || "trans" && i.user.id !== client.user.id;

        const Option = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('btn1')
                .setLabel('test')
                .setStyle('PRIMARY'),
            )
        message.reply({ content: "Admin", components: [Option] })
    }
}