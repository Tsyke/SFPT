const { MessageEmbed, MessageActionRow, MessageButton, Guild } = require('discord.js');



module.exports = {
    name: "emit",

    async execute(client, message, args) {
        if (message.author.id == "805514364277882901") {
            if (!args[0]) return
            client.emit(args[0], message.member);
            var okEmbed = new MessageEmbed()
                .setDescription(`Évenement ${args[0]} éxécuté.`)
                .setColor("GREEN")
            message.reply({ embeds: [okEmbed] })
        }
    }
}