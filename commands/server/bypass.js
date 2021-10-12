module.exports = {
    name: 'bypass',
    aliases: 'Aucun',
    permission: "ADMINISTRATOR",

    async execute(client, message, args) {
        if (!message.member.permissions.has(this.permission)) return message.channel.send({
            content: ":x: Erreur 403 (Forbidden)"
        })
        let id = args[0];
        let user = client.users.cache.get(id);
        if (!id) {
            return message.channel.send({ content: client.emoji.informations + 'Veuillez fournir l\'ID de la personne !' })
        } else if (id) {
            let bypassDoc = await client.bypass.findOne({
                guildID: message.guild.id
            })
            if (!bypassDoc) {
                bypassDoc = await new client.bypass({
                    guildID: message.guild.id,
                    userID: [`${id}`]
                })
                await bypassDoc.save().then(
                    message.channel.send({ content: `${user} est autorisé sur ce serveur` })
                )

            } else if (bypassDoc) {
                bypassDoc.userID.push(id)
                await bypassDoc.save().catch(err => console.log(err)).then(
                    message.channel.send({ content: `${user} est autorisé sur ce serveur` })
                )
            }
        }
    },
}