module.exports = async(client, role) => {
    var GuildData = await client.GetGuildData(role.guild.id)

    if (GuildData.raid === "passif") {
        if (GuildData.passif === true) {
            role.delete()
        }
    }
}