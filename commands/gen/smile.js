const { MessageEmbed } = require('discord.js');
const superagent = require('superagent')
module.exports = {
    name: "smile",
    desc: "Affiche un embed",
    permission: "Aucune",
    category: "Général",
    aliases: 'Aucun',

    async execute(client, message, args) {
        const embed = new MessageEmbed();
        const { body } = await superagent.get("https://waifu.pics/api/sfw/smile")

        if (message.mentions.users.first() && message.mentions.users.first().id != message.author.id) {
            embed.setColor(message.member.displayColor);
            embed.setTitle(`${message.author.username} sourie à ${message.mentions.users.first().username} 🙂`);
            embed.setImage(body.url);
        } else {
            embed.setColor(message.member.displayColor);
            embed.setTitle(`${message.author.username} self smile 🙂`);
            embed.setImage(body.url);
        }
        message.channel.send({ embeds: [embed] })

    }
}