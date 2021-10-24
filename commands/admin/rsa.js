const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "rsa",

    async execute(client, message, args) {
        var msg = args.join(" ");
        var baseURL = "https://discord.com/channels/893915741789782067/"
        let channelA = message.mentions.channels.first();
        if(!channelA) return
        var URL = baseURL + channelA;
        if(!msg) return;
        if(msg){
            const channel = await client.channels.cache.get("901574659403812874");
            if(!channel) return message.reply(":warning: Erreur de salon (responsable-annonces)");
            if(channel) {
                var AnnonceEmbed = new MessageEmbed()
                .setAuthor(`SFPT Bot`)
                .setURL(URL)
                .setTitle("Nouvelle annonce à faire")
                .setDescription(`${msg.replace(channelA, "")}`)
                .setColor("BLUE")
                .setFooter("SFPT® 2021")

                var components = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('rsavalid')
                    .setLabel('Annonce faite')
                    .setStyle('SUCCESS'),
                )

                await channel.send({content:"<@&898633325349068820>", embeds: [ AnnonceEmbed ], components: [components] })
                message.reply({content:":white_check_mark: Embed envoyer"})
            }
        }
    }
}