const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Afficher le panel d\'aide',
    commandOptions: [],
    async execute(interaction) {
        var MemberEmbed = new MessageEmbed()
            .setTitle(`Help de ${client.user.tag}`)
            .setFooter("En cas de soucis veuillez contacter le support.")
            .setColor('BLUE')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields({
                name: "⚠ Anti-raid",
                value: "`raidmode` `captcha` `allow-spam` `anti-spam` `anti-bot` `age-ban` `anti-links` `anti-webhook`"
            }, {
                name: "🛫 Système de départ/arrivé",
                value: "`welcome`"
            }, {
                name: "🦺 Modération",
                value: "`panel` `ban` `kick` `add-emoji` `channelclear` `clear` `top-invite`"
            }, {
                name: "🤖 Général",
                value: "`ticket` `hug` `kiss` `kill` `cuddle` `lick` `smile`"
            }, {
                name: "🧪 Utiles",
                value: "`logs` `prefix` `bot-info`"
            }, {
                name: "❤ Plus",
                value: `[Invité le bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=bot%20applications.commands)\n[Rejoindre le support](https://discord.gg/8pbVZVCAwH)`

            })
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    embeds: [MemberEmbed]
                }
            }
        })
    },
};