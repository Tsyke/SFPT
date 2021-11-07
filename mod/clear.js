const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'clear',
    aliases: ["Aucun"],
    category: 'Modération',
    formation: 'clear <1-99>',
    utilisation: 'Supprime des messages',

    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`Permission insuffisante.`)
        {
            message.delete();
            if (message.member.permissions.has('MANAGE_MESSAGES')) {

                let args = message.content.trim().split(/ +/g)

                if (args[1]) {
                    if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
                        var LogsEmbed = new MessageEmbed()
                        .setTitle('Clear')
                        .setColor("RED")
                        .addFields({
                            name: 'Modérateur:',
                            value: `${message.author}`,
                            inline: true
                        }, {
                            name: 'Salon:',
                            value: `${message.channel.name}`,
                            inline: true
                        }, {
                            name:"Nombre de messages:",
                            value:args[1],
                            inline: true
                        })
                         await logs.send({embeds: [LogsEmbed]})
                        message.channel.bulkDelete(args[1])
                        let msg = await message.channel.send(`${message.author.tag} à supprimé ${args[1]} message(s)`

                        )
                        await setTimeout(function() {
                            msg.delete()

                            setTimeout(function() {
                                msg.delete()
                            }, 5000);

                        }, 2000)

                    } else {
                        let msg = await message.channel.send(`Nombre de message indiqué suppérieur à 99, ou inferieur à 1.`

                        )
                        await setTimeout(function() {
                            msg.delete()

                            setTimeout(function() {
                                msg.delete()
                            }, 5000);

                        }, 2000)

                    }
                } else {
                    let msg = await message.channel.send(`Nombre de message non indiqué.`)
                    await setTimeout(function() {
                        msg.delete()

                        setTimeout(function() {
                            msg.delete()
                        }, 5000);

                    }, 2000)
                }
            }
        }
    }

};