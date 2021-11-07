const { MessageEmbed } = require('discord.js');
console.log("help1")
module.exports = {
    name: "help",
    aliases: "h",
    permission: "Aucune",
    owner: false,
    BotPerm: 8,

    async execute(client, message, args) {
        console.log("help2")

        if (!args[0]) {
            var MemberEmbed = new MessageEmbed()
                .setTitle(`Help de ${client.user.tag}`)
                .setFooter("En cas de soucis veuillez contacter le support.")
                .setColor(message.member.displayColor)
                .setThumbnail(client.user.displayAvatarURL())
                .addFields({
                    name: "⚠ Anti-raid",
                    value: "`raidmode` `captcha` `allow-spam` `anti-spam` `anti-bot` `age-ban` `anti-links` `anti-webhook` `create-license` `urgence`"
                }, {
                    name: "🛫 Système de départ/arrivé",
                    value: "`welcome`"
                }, {
                    name: "🦺 Modération",
                    value: "`panel` `ban` `kick` `add-emoji` `channelclear` `clear` `top-invite`"
                }, {
                    name: "🚌 Serveur",
                    value: "`voice`"
                }, {
                    name: "🤖 Général",
                    value: "`ticket` `hug` `kiss` `kill` `cuddle` `lick` `smile`"
                }, {
                    name: "🧪 Utiles",
                    value: "`logs` `prefix` `bot-info`"
                }, {
                    name: "❤ Plus",
                    value: `[Invité le bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${this.BotPerm}&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands)\n[Rejoindre le support](https://discord.gg/8pbVZVCAwH)`

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