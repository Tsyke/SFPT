module.exports = async(client, guild) => {
    let guildDoc = await client.guild.findOne({
        guildID: guild.id
    })
    if (guildDoc) {
        guildDoc.delete()
        var guildDelete = client.channels.cache.get("893978764923519066")
        if (!guildJoin) return
        var embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("J'ai quitté un serveur")
            .addFields({
                name: "Nom du serveur",
                value: `${guild.name}`
            }, {
                name: "ID du serveur",
                value: `${guild.id}`,
                inline: true
            }, {
                name: "Nombre de membres",
                value: `${guild.memberCount}`
            })
        guildDelete.send({ embeds: [embed] })
    } else return
};