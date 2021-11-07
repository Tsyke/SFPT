const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'voice',
    permission: "ADMINISTRATOR",

    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {
        if (!message.member.permissions.has(this.permission)) return
        var option;
        option = args[0];
        if (!option) return message.reply({ content: "Argument non valide, argumement valide: set, enable, disable" })
        if (option === "set") {
            option = args[1];
            if (!option) return client.Error({ type: 'args', error: 'Aucun salon indiquer' }, message);
            if (isNaN(option)) return client.Error({ type: "syntax", error: 'Ceci n\'est pas un id' }, message);
            var search;
            search = await client.searchChannel(option);
            if (!search) return client.Error({ type: "syntax", error: 'Salon invalide' }, message)
            GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { voice: `${option}` } })
            var embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${message.author}, vous avez définie les salons vocaux automatique sur le salon vocal ${search}`)
            var LogsEmbed = new MessageEmbed()
                .setTitle('Auto-Voice')
                .setColor("GREEN")
                .setDescription(`Auto-Voice configuré`)
                .addFields({
                    name: 'Modérateur:',
                    value: `${message.author}`,
                    inline: true
                }, {
                    name: 'Salon:',
                    value: `${search}`,
                    inline: true
                })
            message.reply({ embeds: [embed] })
            logs.send({ embeds: [LogsEmbed] })

        } else if (option === "enable") {
            if (GuildData.voiceA === true) return message.reply({ content: ":x: Auto-Voice déjà actif" })
            if (GuildData.voice === "undefined" || !GuildData.voice) return client.Error({ type: 'syntax', error: `Aucun salon définie, faites ${prefix}voice set <id du salon>` }, message);
            GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { voiceA: true } });
            var voice;
            voice = message.guild.channels.cache.get(GuildData.voice)
            if (!voice) return message.reply({ content: "Une erreur inconnue s'est produite. Faites " + `${prefix}voice set <id du salon>` })
            var embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${message.author}, vous avez activer les salons vocaux automatique sur le salon vocal ${voice}`)
            var LogsEmbed = new MessageEmbed()
                .setTitle('Auto-Voice')
                .setColor("GREEN")
                .setDescription(`Auto-Voice activé`)
                .addFields({
                    name: 'Modérateur:',
                    value: `${message.author}`,
                    inline: true
                })
            message.reply({ embeds: [embed] })
            logs.send({ embeds: [LogsEmbed] })
        } else if (option === "disable") {
            if (GuildData.voiceA === false || !GuildData.voiceA) return message.reply({ content: ":x: Auto-Voice déjà désactiver" })
            GuildData = await client.guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { voiceA: false } });
            var embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${message.author}, vous avez désactiver les salons vocaux automatique.`)
            var LogsEmbed = new MessageEmbed()
                .setTitle('Auto-Voice')
                .setColor("GREEN")
                .setDescription(`Auto-Voice Désactivé`)
                .addFields({
                    name: 'Modérateur:',
                    value: `${message.author}`,
                    inline: true
                })
            message.reply({ embeds: [embed] })
            logs.send({ embeds: [LogsEmbed] })
        } else return message.reply({ content: "Argument non valide, argumement valide: set, enable, disable" })
    }
}