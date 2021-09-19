const { MessageEmbed } = require('discord.js');
const { welcomeImage } = require('ultrax');
module.exports = {
    name: "captcha",
    permission: "ADMINISTRATOR",
    aliases: 'Aucun',

    async execute(client, message, args) {
        var captcha;
        captcha = await client.GetGuildData(message.guild.id);

        var mode;
        mode = {
            true: "Actif",
            false: "Inactif"
        }

        if (!args[0]) {
            if (captcha.captcha === true) {
                var trueEmbed = new MessageEmbed()
                    .setTitle(':shield: Paramètres du captcha')
                    .setColor('RED')
                    .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
                    .setImage("https://cdn.discordapp.com/attachments/888840211184898099/889199967254769794/captcha.png")
                    .addFields({
                        name: ':punch: Rôle donné:',
                        value: '`sfpt.captcha set <id_Du_Role / mention>`'
                    }, {
                        name: ':x: Désactiver le captcha',
                        value: '`sfpt.captcha disable`'
                    })
                return message.channel.send({ embeds: [trueEmbed] })
            }
            if (captcha.captcha === false) {
                var falseEmbed = new MessageEmbed()
                    .setDescription("**Le captcha est désactivé sur ce serveur.** Pour l'activer, faites `sfpt.captcha enable`\n Autre possibilité: `sfpt.captcha set`")
                    .setColor("GREEN")
                    .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
                    .setImage("https://cdn.discordapp.com/attachments/888840211184898099/889199967254769794/captcha.png")
                return message.channel.send({
                    embeds: [falseEmbed]
                })
            }



        } else if (args[0] === 'enable') {
            if (captcha.captcha === true) {
                return message.channel.send({ content: ':warning: Captcha déjà activé' })
            }
            const role = message.guild.roles.cache.find((x) => x.name == "non vérifié")
            if (!role) {
                let verif = await message.guild.roles.create({

                    name: 'non vérifié',
                    color: 'BLUE',
                    reason: 'Captcha',
                })
            }
            const channel = message.guild.channels.cache.find(channel => channel.name === "vérification")
            if (!channel) {
                let noverif = message.guild.roles.cache.find((x) => x.name == "non vérifié")
                if (!noverif) return message.channel.send({ content: ":warning: Erreur lors de l'exécution du fichier `captcha.js`" })
                let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")
                message.guild.channels.create("verification", {
                    type: "channel",
                    topic: "",
                    id: message.guild.id,
                    permissionOverwrites: [{
                            id: noverif.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                        },
                        {
                            id: everyone.id,
                            allow: [],
                            deny: ["VIEW_CHANNEL"]
                        }
                    ]
                })
            }
            captcha = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { captcha: true } })
            await captcha.save().catch(err => console.log(err))
            var LogsEmbed = new MessageEmbed()
                .setTitle('[Modification] Captcha')
                .setDescription(`Captcha activé`)
                .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
                .setColor('RED')
                .addField('Modérateur:', `${message.author}`)
            var logs = await message.guild.channels.cache.get(captcha.logs)
            if (!logs) {
                message.channel.send({ content: ":warning: Erreur de logs" })
            } else {
                logs.send({ embeds: [LogsEmbed] })
            }
            return message.channel.send({ content: '✅ Captcha activé' })
        } else if (args[0] === 'disable') {
            if (captcha.captcha === false) {
                return message.channel.send(':warning: Captcha déjà désactivé')
            }
            const role = message.guild.roles.cache.find((x) => x.name == "non vérifié")
            const channel = message.guild.channels.cache.find(channel => channel.name === "verification")
            channel.delete()
            role.delete()
            captcha = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { captcha: false } })
            var LogsEmbed = new MessageEmbed()
                .setTitle('[Modification] Captcha')
                .setDescription(`Captcha désactivé`)
                .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
                .setColor('GREEN')
                .addField('Modérateur:', `${message.author}`)
            var logs = await message.guild.channels.cache.get(captcha.logs)
            if (!logs) {
                message.channel.send({ content: ":warning: Erreur de logs" })
            } else {
                logs.send({ embeds: [LogsEmbed] })
            }
            return message.channel.send('✅ Captcha désactivé')
        } else if (args[0] === 'set') {
            var role = message.mentions.roles.first() || args[1]

            let VRole = message.guild.roles.cache.get(role.id || role);
            if (!VRole) {
                return message.channel.send({
                    content: ":x: Veuillez renseigner une valeur correct. Exemple: ```sfpt.captcha set <roleId / mention>```"
                })
            }
            if (!role) {
                return message.channel.send({ content: ":x: Veuillez renseigner une valeur correct. Exemple: ```sfpt.captcha set <roleId / mention>```" })

            }
            if (role) {
                guilddoc = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { CaptchaRole: role } })
                return message.channel.send({ content: ":white_check_mark: Rôle du captcha configuré sur: " + VRole.name })
            }
        }

    },
}