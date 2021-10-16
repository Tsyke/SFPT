module.exports = async(client, channel) => {
    let guild = channel.guild;
    const audit = (await channel.guild.fetchAuditLogs()).entries.first();
    const GuildData = await client.GetGuildData(channel.guild.id);

    if (GuildData.webhook === true) {
        if (audit.action === 'WEBHOOK_CREATE') {
            if (audit.executor.id === bot.user.id) return;
            if (audit.executor.permissions.has("ADMINISTRATOR")) return
            audit.target.delete().catch(async() => {})
            guild.members.ban(audit.executor.id, { reason: `Anti-Webhook` })
        }
    }
}