const { discord_client: { token }, database: { url } } = require('./config.json')
const { Client, Intents, Collection } = require('discord.js');
const SFPT = require('./class/SFPT.js')
const connect = require('./configs/MongoConnect');

const client = new SFPT({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] })
const fs = require('fs');
client.commands = new Collection();

(async() => {
    await fs.readdir("./events/", (err, files) => {
        if (err) return console.log(err);
        files.forEach((f) => {
            const event = require(`./events/${f}`);
            let eventName = f.split(".")[0];
            console.log(`Event chargé: \x1b[34m\x1b[4m${f}\x1b[0m`);
            client.on(eventName, event.bind(null, client));
        });
    });

    await fs.readdirSync('./commands').forEach(dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const command = require(`./commands/${dirs}/${file}`);
            console.log(`Chargement de la commande \x1b[34m\x1b[4m${file}\x1b[0m dans le département \x1b[34m\x1b[4m${dirs}\x1b[0m`);
            client.commands.set(command.name, command);
        };
    });
    console.log('_________________________________________________________________________')


    client.login(token).then(
        console.log('Bot Loggin'),
        await connect(),
        console.log('DataBase connect on SFPT')

    )
})();