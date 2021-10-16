const { MessageEmbed } = require('discord.js')
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}

module.exports = {
    name: 'bot-info',
    desc: "Affiche les informations du bot",
    permission: "Aucune",
    category: "Utils",
    aliases: 'bi',


    async execute(client, message, args) {
        const version = ' 0.0.9'


        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        var os1 = require('os-utils');
        let pack = require('../../package.json')
        const os = require('os')

        os1.cpuUsage(function(v) {

            var uptime = (process.uptime() + "").toHHMMSS();
            const InfoEmbed = new MessageEmbed()
                .setColor("BLUE")
                .addFields({
                        name: 'Nom',
                        value: `**\`${client.user.username}\`**`,
                        inline: true
                    }, {
                        name: 'Tag',
                        value: `**\`${client.user.tag}\`**`,
                        inline: true
                    }, {
                        name: 'ID',
                        value: `**\`${client.user.id}\`**`,
                        inline: true
                    }, {
                        name: 'Créateur',
                        value: `Le créateur de SFPT est <@805514364277882901>`,
                        inline: false
                    }, {
                        name: '✨ Objectif',
                        value: `\`${client.guilds.cache.size}\`/75 serveurs`,
                        inline: false

                    }, {
                        name: '🔢・Nombres de commandes.',
                        value: `\`${client.commands.size}\` commandes.`,
                        inline: false

                    }

                )
                .setThumbnail(client.user.displayAvatarURL())
                .addField('\u200b', '**__Confifuration:__**')
                .addFields({
                        name: '**__Mémoires RAM__**',
                        value: `\`${Math.round(used * 100) / 100}Mb / 2Go\``,
                        inline: true
                    }, {
                        name: '**__Mémoires Total__**',
                        value: '`414.49 MB / 5 GB`',
                        inline: true

                    }, {
                        name: '**__Usage CPU__**',
                        value: '`' + v.toFixed(2) + "%" + '`',
                        inline: true

                    },

                )
                .addField('\u200b', '**__Système:__**')
                .addField('OS:', '`' + os.platform() + '`', true)
                .addField('Discord:', '`' + pack.dependencies['discord.js'].slice(1) + '`', true)
                .addField('Node:', '`' + process.version.slice(1) + '`', true)
                .addField('Informations du Serveur:', '`' + os.cpus().length + 'Cores`', true)


            .addFields({
                    name: '**__Statistiques__**',
                    value: `
                        **Base de donnée:** MongoDB || DBeaver
                        **Nombres de serveurs:** \`${client.guilds.cache.size} serveurs\`\n
                        **Nombres de salons:** \`${client.channels.cache.size} salons\`\n
                        **Nombres d'utilisateurs:** \`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs\`\n

                        `
                })
                .addFields({
                    name: '**__Statistiques réseaux de SFPT__**',
                    value: `
                    **Uptime:** \`${uptime}\` et \`${Math.round(client.ws.ping)}ms\` de ping
                    `
                })
                .setFooter('Version:' + version)


            message.channel.send({ embeds: [InfoEmbed] });
        })
    }
}