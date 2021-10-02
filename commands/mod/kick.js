const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'kick',
    desc: "Kick un membre",
    permission: "KICK_MEMBERS",
    category: "Modération",
    aliases: 'Aucun',
    async execute(client, message, args) {
        if (!message.member.permissions.has(this.permission)) return message.channel.send({
            content: ":x: Erreur 403 (Forbidden)"
        })
        const reason = args.slice(1).join(' ');
        let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let GuildDoc = await client.GetGuildData(message.guild.id)
        let log = GuildDoc.LogsChannel;
        let logs = message.guild.channels.cache.get(log)
        if (!User) {
            return message.channel.send({
                content: `Paramètre invalide. Usage correct: \`${GuildDoc.prefix}kick <mention/id> <reason>\``
            })
        }
        if (isNaN(User.id)) {
            return message.channel.send({
                content: `Paramètre invalide. Usage correct: \`${GuildDoc.prefix}kick <mention/id> <reason>\``
            })
        }
        if (User) {
            if (!reason) {
                return message.channel.send({
                    content: `Paramètre invalide. Usage correct: \`${GuildDoc.prefix}kick <mention/id> <reason>\``
                })
            } else if (reason) {
                const memberPosition = User.roles.highest.position;
                const moderationPosition = message.member.roles.highest.position;
                if (message.author.id === User.id) {
                    return (message.channel.send('Impossible de vous auto-kick.'))
                }
                if (message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)) {
                    return (message.channel.send('Impossible de Kick quelqu\'un de plus haut que vous ou égal à vous.'))
                }
                var LogsEmbed = new MessageEmbed()
                    .setTitle('Santion [Kick]')
                    .setColor("RED")
                    .addFields({
                        name: 'Modérateur:',
                        value: `${message.author}`,
                        inline: true
                    }, {
                        name: 'Utilisateur:',
                        value: `${User}`,
                        inline: true
                    }, {
                        name: 'Raison:',
                        value: `> ${reason}`
                    })
                await logs.send({ embed: LogsEmbed })
                var UserEmbed = new MessageEmbed()
                    .setTitle(`Santion [Kick]`)
                    .setDescription(`Vous venez d'être kick de **__${message.guild.name}__** par **__${message.author}__**`)
                    .setColor("RED")
                    .addFields({
                        name: 'Raison:',
                        value: `> ${reason}`
                    })
                await User.send({
                    embed: UserEmbed
                })
                User.kick(reason)
            }
        }
    },
}