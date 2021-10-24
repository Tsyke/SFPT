const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "code",

    async execute(client, message, args) {
        var code;
        code = args[0];

        if(!code) return message.reply({content:"Aucun code fournie"})
        if(code) {
            if(code === "EM145PX") {
                var reply = new MessageEmbed()
                .setTitle('Commandes: add-emoji')
                .setDescription("Votre émoji n'existe plus, ou alors il est invalide")
                message.reply({embeds: [reply]})
            }

            else {
                return message.reply({content:"Votre code est invalide"})
            }
        }
    }
}