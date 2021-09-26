module.exports = async(client, guild) => {
    let guildDoc = await client.guild.findOne({
        guildID: guild.id
    })
    if (guildDoc) guildDoc.delete()
    else return
};