const { MessageEmbed } = require('discord.js');
const { captchaCodeGen } = require('SFPT');
const { welcomeImage } = require('ultrax');
const ms = require('ms');

module.exports = async(client, member) => {

    const guild = await client.GetGuildData(member.guild.id)

    var logs;
    logs = member.guild.channels.cache.get(guild.logs)
    if (!logs) return member.guild.owner.send({ content: "Erreur: Logs" });

    if (!guild) {
        throw new Error(`DataBase error: No guild id provided [${member.guild.name} & ${member.guild.id}] (./events/guildMemberAdd.js:6:45)`)
    } else {
        if (guild.captcha === true) {
            var NoVerifRole;
            NoVerifRole = await member.guild.roles.cache.find((x) => x.name == "non vérifié");
            if (!NoVerifRole) return member.guild.owner.send({ content: "Erreur: Role captcha" });

            var EndVerifRole;
            EndVerifRole = await member.guild.roles.cache.get(guild.CaptchaRole);
            if (!EndVerifRole) return member.guild.owner.send({ content: "Erreur: Role captcha" });

            var VerifChannel;
            VerifChannel = await member.guild.channels.cache.find(channel => channel.name === "verification");
            if (!VerifChannel) return member.guild.owner.send({ content: "Erreur: Channel captcha" });

            var captchaCode;
            captchaCode = captchaCodeGen(6);

            var date;
            date = new Date(member.user.createdAt).toLocaleString("FR-fr", { timeZone: "Europe/Paris" });

            var StartLogsEmbed;
            StartLogsEmbed = new MessageEmbed()
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
                .setDescription(`${member} vient de rejoindre le serveur.`)
                .addField('ID du compte:', `${member.id}`, true)
                .addField('A crée son compte le :', `${date}`)
                .setColor("RED")
                .setFooter('SFPT à commencé la vérification.');
            logs.send({ embeds: [StartLogsEmbed] });

            member.roles.add(NoVerifRole);

            const msg = await VerifChannel.send({ content: `${member}` });

            var filterMessage;
            filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;


            var FailCodeCaptcha;
            FailCodeCaptcha = `:x: ${member} n'a pas passé la vérification`

            var NoFailCodeCaptcha;
            NoFailCodeCaptcha = `:white_check_mark: ${member} a passé la vérification`

            var bg;
            bg = "https://cdn.discordapp.com/attachments/888840211184898099/889193912399437924/unknown.png";

            var avatar;
            avatar = "https://cdn.discordapp.com/attachments/874987314261159977/889204014955261952/15afdc7b92c8af3b4b084222641bc5cd.png"

            var text1;
            text1 = "Voici votre captcha:";

            var text2;
            text2 = captchaCode;

            var text3;
            text3 = " ";

            var color;
            color = '#fff';

            var options;
            options = {

                attachmentName: `captcha`,
                text1_fontSize: 80,
                text2_fontSize: 50,
                text3_fontSize: 5,
            };

            var image;
            image = await welcomeImage(bg, avatar, text1, text2, text3, color, options);

            VerifChannel.send({
                files: [image]
            });

            const filter = m => {
                if (m.author.bot) return;
                if (m.author.id === member.id && m.content === captchaCode) return true;
                else {
                    m.channel.send("Mauvais captcha !")
                    VerifChannel.bulkDelete(4)
                    member.kick()
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages({ filter, max: 1, time: ms('60s'), errors: ['time'] });
            if (response) {
                await VerifChannel.send("Captcha validé vous avez désormer accès au serveur !")
                member.roles.remove(NoVerifRole)
                VerifChannel.bulkDelete(4)
                member.roles.add(EndVerifRole).then(logs.send({ content: NoFailCodeCaptcha }))
            }
        }
    }
    if (guild.raid === true) {
        var date;
        date = new Date(member.user.createdAt).toLocaleString("FR-fr", { timeZone: "Europe/Paris" });

        var MemberEmbed = new MessageEmbed()
            .setTitle(':warning: RaidMode')
            .setDescription(`Le raidmode est activé sur le serveur: **__\`${member.guild.name}\`__**`)
            .setColor('#ff0000')
        await member.send({ embeds: [MemberEmbed] })

        var LogsEmbed = new MessageEmbed()
            .setTitle(':information_source: RaidMode')
            .setDescription(`Un membre a essayer de rejoindre: \nUsername: ${member.user.username}\nTag: ${member.user.tag}\nCréation du compte: ${date}`)
            .setColor('#ff0000')
        await logs.send({ embeds: [LogsEmbed] })

        member.kick()
    }

    if (guild.ageban === true) {
        console.log(member.user.createdAt)
        console.log(guild.agebanTime)
        if (member.user.createdAt < guild.agebanTime) {
            var date;
            date = new Date(member.user.createdAt).toLocaleString("FR-fr", { timeZone: "Europe/Paris" });

            var MemberEmbed = new MessageEmbed()
                .setTitle(':warning: Age-ban')
                .setDescription(`L'age-ban est activé sur le serveur: **__\`${member.guild.name}\`__**`)
                .setColor('#ff0000')
            await member.send({ embeds: [MemberEmbed] })

            var LogsEmbed = new MessageEmbed()
                .setTitle(':information_source: Age-ban')
                .setDescription(`Un membre a essayer de rejoindre: \nUsername: ${member.user.username}\nTag: ${member.user.tag}\nCréation du compte: ${date}`)
                .setColor('#ff0000')
            await logs.send({ embeds: [LogsEmbed] })

            member.kick()
        }
    }

}