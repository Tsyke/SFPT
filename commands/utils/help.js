const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    aliases: "h",
    permission: "Aucune",
    owner: false,
    BotPerm: 260717412343,

    async execute(client, message, args) {
        if (!args[0]) {
            var MemberEmbed = new MessageEmbed()
                .setTitle(`Help de ${client.user.tag}`)
                .setFooter("En cas de soucis veuillez contacter le support.")
                .setColor(message.member.displayColor)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields({
                    name: "⚠ Anti-raid",
                    value: "`raidmode` `captcha` `allow-spam` `anti-spam` `anti-bot` `age-ban` `anti-links`"
                }, {
                    name: "🦺 Modération",
                    value: "`ban` `kick`"
                }, {
                    name: "🤖 Général",
                    value: "`En dev`"
                }, {
                    name: "🧪 Utiles",
                    value: "`logs` `prefix`"
                }, {
                    name: "❤ Plus",
                    value: `[Invité le bot](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${this.BotPerm}&scope=bot)\N
                    [Rejoindre le support](https://discord.gg/8pbVZVCAwH)
                    `
                })
            message.reply({ embeds: [MemberEmbed] })
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));
            if (!command) return message.channel.send({ content: `Je ne trouve pas cette commande !` });
            var embed = new MessageEmbed()
                .addFields({
                    name: 'Nom',
                    value: command.name ? command.name : '404 Not Found',
                    inline: true
                }, {
                    name: 'Diminutif',
                    value: command.aliases ? command.aliases : '404 Not Found',
                    inline: true
                }, {
                    name: 'Permission(s)',
                    value: command.permission ? command.permission : '404 Not Found',
                    inline: true
                }, )
                .setTimestamp()
                .setDescription('Trouvez des informations sur la commande fournie.')
            message.channel.send({
                embeds: [embed]
            })
        }
    },
};