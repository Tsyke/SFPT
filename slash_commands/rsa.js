const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'rsa',
    description: 'Admin',
    commandOptions: [{
            type: 3,
            name: "channel",
            description: "link channel",
            required: true
        },
        {
            type: 3,
            name: "content",
            description: "content",
            required: true
        }
    ],
    async execute(interaction) {
        var msg = interaction.data.options[1].value;
        var baseURL = "https://discord.com/channels/893915741789782067/"
        let channelA = interaction.data.options[0].value;
        let channelB = channelA.replace('<#', "")
        let channelC = channelB.replace('>', '')
        if (!channelA) return
        var URL = baseURL + channelC;
        if (!msg) return;
        if (msg) {
            const channel = await client.channels.cache.get("901574659403812874");
            if (!channel) return client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: ":warning: Erreur de salon (responsable-annonces)"
                    }
                }
            })
            if (channel) {
                var AnnonceEmbed = new MessageEmbed()
                    .setAuthor(`SFPT Bot`)
                    .setURL(URL)
                    .setTitle("Nouvelle annonce à faire")
                    .setDescription(`${msg}`)
                    .setColor("BLUE")
                    .setFooter("SFPT® 2021")

                var components = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('rsavalid')
                        .setLabel('Annonce faite')
                        .setStyle('SUCCESS'),
                    )

                await channel.send({ content: "<@&898633325349068820>", embeds: [AnnonceEmbed], components: [components] })
                return client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: ":white_check_mark: Embed envoyer"
                        }
                    }
                })
            }
        }
    }
}