const { MessageEmbed } = require('discord.js');
const superagent = require('superagent')
module.exports = {
    name: "lick",
    desc: "Affiche un embed",
    permission: "Aucune",
    category: "Général",
    aliases: 'Aucun',

    async execute(client, message, args) {
        const embed = new MessageEmbed();
        const { body } = await superagent.get("https://waifu.pics/api/sfw/lick")

        if (message.mentions.users.first() && message.mentions.users.first().id != message.author.id) {
            embed.setColor(message.member.displayColor);
            embed.setTitle(`${message.author.username} lick ${message.mentions.users.first().username} 😋`);
            embed.setImage(body.url);
        } else {
            embed.setColor(message.member.displayColor);
            embed.setTitle(`${message.author.username} self lick 😋`);
            embed.setImage(body.url);
        }
        message.channel.send({ embeds: [embed] })

    }
}