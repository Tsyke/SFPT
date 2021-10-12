const { MessageEmbed } = require('discord.js');
const superagent = require('superagent')
module.exports = {
    name: "hug",
    desc: "Affiche un embed",
    permission: "Aucune",
    category: "Général",
    aliases: 'Aucun',

    async execute(client, message, args) {
        const embed = new MessageEmbed();
        const { body } = await superagent.get("https://nekos.life/api/v2/img/hug")

        if (message.mentions.users.first() && message.mentions.users.first().id != message.author.id) {
            embed.setColor(message.member.displayColor);
            embed.setTitle(`${message.author.username} fais un câlin à ${message.mentions.users.first().username} ❤`);
            embed.setImage(body.url);
        } else {
            embed.setColor(message.member.displayColor);
            embed.setTitle(`${message.author.username} S'auto hug ❤`);
            embed.setImage(body.url);
        }
        message.channel.send({ embeds: [embed] })

    }
}