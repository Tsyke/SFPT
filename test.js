const { Client, Intents, Collection } = require('discord.js');

const SFPT = require('./class/SFPT');
const client = new SFPT({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
var HtmlMail;
HtmlMail = `
                <style>
                body{
                    font-family: 'Courier New', Courier, monospace;
                    }
                .token{
                    color: red;
                }
                .cen{
                    text-align: center;
                }
                </style>
                <center><img src="https://cdn.discordapp.com/avatars/888839441454628897/7c504aead7837a02712e1816a374a0ae.png"></center>
                <h1 class="cen">SFPT BOT</h1>
                <h3 class="cen">Security, safe, clean, and really protect</h3>
                <h4>Merci  de faire confiance à l'équipe SFPT.
                <br>
                <h4>Votre token pour réinitialiser votre mot de passe est: </h4><h4 class="token"></h4>

                <h2>Cordialement, l'équipe administrative de Bot
                         `
const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: './test.html',
    host: client.config.nodemailer.service,
    port: client.config.nodemailer.port,
    auth: {
        user: client.config.nodemailer.auth.user,
        pass: client.config.nodemailer.auth.pass
    }
});

message = {
    from: client.config.nodemailer.MessageMail.from,
    to: "debalmatheo@gmail.com",
    subject: client.config.nodemailer.MessageMail.subject,
    // html: HtmlMail
    text: "Test"
}
transporter.sendMail(message, function(err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info.rejected);
    }
})