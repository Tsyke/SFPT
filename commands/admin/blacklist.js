const { MessageEmbed, MessageActionRow, MessageButton, Guild } = require('discord.js');

module.exports = {
    name: "blacklist",
    owner: false,
    aliases: "bl",

    async execute(client, message, args, prefix, data, object, guild, logs, GuildData) {
        var option;
        option = args[0];
        if (!option) return client.Error({ type: "args", error: "Paramètre manquant. Arguments possible: `add || remove`" }, message)
        if (option === "add") {
            option = message.mentions.members.first() || client.users.cache.get(args[1]);
            if (!option) return client.Error({ type: "args", error: "Utilisateur manquant." }, message);
            if (option) {
                var UserSearch = await client.BlackList.findOne({
                    userID: option.id
                });
                if (UserSearch) return message.reply({ content: "Membre déjà dans la liste." })
                await message.reply({ content: "Veuillez entrer la raison ci-dessous." })
                const filterMessage = (m) => m.author.id === message.author.id && !m.author.bot;
                var reason;
                var Awaitreason = await message.channel.awaitMessages({ filterMessage, max: 1, time: 60000 });
                reason = Awaitreason.first()
                await message.reply({ content: "Veuillez entrer l'url de l'image ci-dessous." })
                var image;
                var Awaitimage = await message.channel.awaitMessages({ filterMessage, max: 1, time: 60000 });
                image = Awaitimage.first()
                if (!image.content.includes("http")) return client.Error({ type: "syntax", error: "L'url dois commencé par https ou http" }, message)
                var embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${option} à été blacklist pour ${reason}`)
                    .setImage(`${image}`)
                UserSearch = await new client.BlackList({
                    userID: option.id,
                    reason: reason,
                    image: image
                })
                UserSearch.save().then(
                    message.reply({ embeds: [embed] }))
            }
        } else if (option === "remove") {
            option = args[1];
            if (!option) return client.Error({ type: "args", error: "ID manquant." }, message);
            if (option) {
                var UserSearch = await client.BlackList.findOne({
                    userID: option
                });
                const Option = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('yes')
                        .setLabel('OUI')
                        .setStyle('DANGER'),
                    )
                    .addComponents(
                        new MessageButton()
                        .setCustomId('no')
                        .setLabel('NON')
                        .setStyle('SUCCESS'),
                    )
                if (UserSearch) {
                    message.reply({ content: `Voulez-vous vraiment le supprimé de la blacklist ?`, components: [Option] })
                    const filter = i => i.customId === 'close' || "delete" || "trans" && i.user.id !== client.user.id;

                    const collector = message.channel.createMessageComponentCollector({ filter });

                    collector.on('collect', async btn => {
                        if (btn.customId === 'no') {
                            return message.reply({ content: "Opération annulé" })
                        } else if (btn.customId === 'yes') {
                            await UserSearch.delete()
                            return message.reply({ content: "Opération terminé" })
                        }
                    });
                }
            }
        }
    }
}