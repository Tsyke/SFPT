const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'channel-clear',
    category: "Modération",
    aliases: "cc",
    permission: "ADMINISTRATOR",

    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {
        if (!message.member.permissions.has(this.permission)) return
        const salon = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();

        if (!salon) {
            return message.channel.send({
                content: "Salon invalide"
            })
        }
        if (salon) {
            const Option = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('channelclearno')
                    .setLabel('Annulé')
                    .setStyle('SUCCESS'),
                )
                .addComponents(
                    new MessageButton()
                    .setCustomId('channelclearyes')
                    .setLabel('Supprimé')
                    .setStyle('DANGER'),
                )
            message.reply({ content: "Êtes-vous sûr de faire cela ?", components: [Option] })
            const filter = i => i.customId === 'channelclearyes' || "channelclearno" && i.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'channelclearyes') {
                    const embedValidé = new MessageEmbed()
                        .setColor("#33FF00")
                        .setDescription("Le salon a bien été cloné et supprimé !")

                    i.reply({ embeds: [embedValidé] })

                    salon.clone().then(salon.delete())

                    var LogsEmbed = new MessageEmbed()
                        .setTitle('ChannelClear')
                        .setColor("RED")
                        .addFields({
                            name: 'Modérateur:',
                            value: `${message.author}`,
                            inline: true
                        }, {
                            name: 'Salon:',
                            value: `${salon.name}`,
                            inline: true
                        })
                    await logs.send({ embeds: [LogsEmbed] })
                } else if (i.customId === 'channelclearno') {
                    return i.reply({ content: "Opération annulé" })
                }
            });


        }
    },
}