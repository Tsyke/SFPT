module.exports = async(client, message) => {
    setInterval(async() => {
        const Bot = client.bot;
        let statutBot = await Bot.findOne({
            bot: client.user.id,
        });

        if (!statutBot) {
            statutBot = new Bot({
                bot: client.user.id,
                statut: "En attente de changement",
                commandsUsed: 0
            });
            statutBot.save()
        }

        client.user.setStatus('idle')
        const statuses = [
            () => statutBot.statut ? statutBot.statut : "⚠ Erreur de statut",
            () => statutBot.statut ? statutBot.statut : "⚠ Erreur de statut"
        ]
        let i = 0

        client.user.setActivity(statuses[i](), { type: "PLAYING" })
        i = ++i % statuses.length
    }, 1e4)
}