const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "welcome",
    permission: "ADMINISTRATOR",
    aliases: 'Aucun',
    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {
        if (!message.member.permissions.has(this.permission)) return message.reply({
            content: ":x: Vous n'avez pas la permission"
        });
        else {
            var DesacEmbed = new MessageEmbed()
                .setTitle('[Modification] Message désactivé')
                .setDescription(`Message désactivé`)
                .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
                .setColor('GREEN')
                .addField('Modérateur:', `${message.author}`)

            var AcEmbed = new MessageEmbed()
                .setTitle('[Modification] Message activé')
                .setDescription(`Message activé`)
                .setThumbnail('https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png')
                .setColor('RED')
                .addField('Modérateur:', `${message.author}`)
            var option;
            option = args[0];
            if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Argument possible: \`"enable" || "set" || "disable" || "emit"\`` }, message);
            else if (option) {
                if (option === "enable") {
                    if (!GuildData) return client.Error({ type: 'db', error: `Impossible de trouver le serveur dans la base de donnée` }, message);
                    if (GuildData.UserWelcome === true) return message.reply({ content: ':warning: Message déjà activé' })
                    if (GuildData.channel_wlc === "undefined") return client.Error({ type: "db", error: "Aucun salon n'a été définie" })
                    GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { UserWelcome: true } })
                    message.reply({ content: ":white_check_mark: Message activé." })
                    if (!logs) return message.channel.send({ content: ":warning: Erreur de logs" });
                    else logs.send({ embeds: [AcEmbed] })
                } else if (option === "disable") {
                    if (!GuildData) return client.Error({ type: 'db', error: `Impossible de trouver le serveur dans la base de donnée` }, message);
                    if (GuildData.UserWelcome === false) return message.reply({ content: ':warning: Message déjà désactivé' })
                    GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { UserWelcome: false } })
                    message.reply({ content: ":white_check_mark: Message désactivé." })
                    if (!logs) return message.channel.send({ content: ":warning: Erreur de logs" });
                    else logs.send({ embeds: [DesacEmbed] })
                } else if (option === "set") {
                    option = args[1];
                    if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Argument possible: \`"image" || "welcome" || "bye"\`` }, message);
                    if (option === "image") {
                        option = args[2];
                        if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Écrivez l'url de l'image.` }, message);
                        if (!args[2].includes("http")) return client.Error({ type: "syntax", error: "L'url dois commencé par https ou http" }, message)
                        GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { image_url: option } })
                        var response;
                        response = new MessageEmbed()
                            .setDescription(":white_check_mark: Paramètre modifié pour: ")
                            .setImage(`${option}`)
                            .setColor('GREEN')
                        message.reply({ embeds: [response] })
                    } else if (option === "welcome") {
                        option = message.mentions.channels.first() || args[2];
                        if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Inscrivez le salon` }, message);
                        var channelVerif = await message.guild.channels.cache.get(option.id || option);
                        if (!channelVerif) return message.reply({ content: ":warning: Salon invalide" })
                        GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { channel_wlc: option } })
                        message.reply({ content: ":white_check_mark: Paramètre modifié pour: " + `${channelVerif}` })
                    } else if (option === "bye") {
                        option = message.mentions.channels.first() || args[2];
                        if (!option) return client.Error({ type: 'args', error: `Erreur d'argument. Inscrivez le salon` }, message);
                        var channelVerif = await message.guild.channels.cache.get(option.id || option);
                        if (!channelVerif) return message.reply({ content: ":warning: Salon invalide" })
                        GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { channel_bye: option } })
                        message.reply({ content: ":white_check_mark: Paramètre modifié pour: " + `${channelVerif}` })
                    }
                } else if (option === 'emit') {
                    const ultrax = require('ultrax')
                    var member;
                    member = message.member;
                    if (!GuildData.channel_bye) return
                    let bg = GuildData.image_url
                    let avatar = member.user.displayAvatarURL({ format: "png" })
                    let text1 = "Bienvenue"
                    let text2 = member.user.tag
                    let text3 = `Tu es le ${member.guild.memberCount}ème membre`
                    let color = '#ffffff'
                    const options = {

                        attachmentName: `welcome-${member.id}`,
                        text1_fontSize: 80,
                        text2_fontSize: 50,
                        text3_fontSize: 30
                    }

                    const image = await ultrax.welcomeImage(bg, avatar, text1, text2, text3, color, options)

                    let bvn = await GuildData.channel_wlc
                    let channel = member.guild.channels.cache.get(`${bvn}`)
                    channel.send({
                        files: [image]
                    })
                }
            }
        }
    },
};