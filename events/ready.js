const nodemailer = require('nodemailer');

module.exports = async(client, message) => {
    setInterval(async() => {
        const Bot = client.bot;
        let statutBot = await Bot.findOne({
            bot: client.user.id,
        });
        if (statutBot.stream === false) {

            if (!statutBot) {
                statutBot = new Bot({
                    bot: client.user.id,
                    statut: "En attente de changement",
                    commandsUsed: 0
                });
                statutBot.save()
            }

            client.user.setStatus(statutBot.connexion)
            const statuses = [
                () => statutBot.statut ? statutBot.statut : "⚠ Erreur de statut",
                () => statutBot.statut ? statutBot.statut : "⚠ Erreur de statut"
            ]
            let i = 0

            client.user.setActivity(statuses[i](), { type: "PLAYING" })
            i = ++i % statuses.length

        } else if (statutBot.stream === true) {

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

            client.user.setStatus(statutBot.connexion)
            const statuses = [
                () => statutBot.statut ? statutBot.statut : "⚠ Erreur de statut",
                () => statutBot.statut ? statutBot.statut : "⚠ Erreur de statut"
            ]
            let i = 0

            client.user.setActivity(statuses[i](), { type: "STREAMING", url: "https://twitch.tv/sfpt" })
            i = ++i % statuses.length

        }
    }, 1e4)
    var transporter = nodemailer.createTransport({
        host: client.config.nodemailer.service,
        port: client.config.nodemailer.port,
        pool: client.config.nodemailer.pool,
        tls: {
            rejectUnauthorized: client.config.nodemailer.tls.rejectUnauthorized,
        },
        secure: client.config.nodemailer.secure,
        auth: {
            user: client.config.nodemailer.auth.user,
            pass: client.config.nodemailer.auth.pass
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
            console.log("Server mailer return: " + 501 + `\n\n` + error.stack);
        } else {
            console.log("Server mailer return: " + 200);
        }
    });
}