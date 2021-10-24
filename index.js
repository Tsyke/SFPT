const { discord_client: { token }, database: { url } } = require('./config.json')
const { Client, Intents, Collection, version } = require('discord.js');
const SFPT = require('./class/SFPT.js')
const connect = require('./configs/MongoConnect');
const client = new SFPT({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] })
const fs = require('fs');
client.commands = new Collection();
client.command = new Collection();

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
    await fs.readdirSync('./command').forEach(dirs => {
        const command = fs.readdirSync(`./command/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of command) {
            const commandS = require(`./command/${dirs}/${file}`);
            console.log(`Chargement de la commande \x1b[34m\x1b[4m${file}\x1b[0m dans le département \x1b[34m\x1b[4m${dirs}\x1b[0m`);
            client.command.set(commandS.name, commandS);
        };
    });
    console.log('_________________________________Partie "/" commands________________________________________')

    //!Partie "/" commands
    global.client = client

    client.on('ready', async() => {

        console.log(`\nConnecté en tant que : ${client.user.tag}\n`)

        const commandFiles = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./slash_commands/${file}`);
            client.api.applications(client.user.id).guilds('893915741789782067').commands.post({
                data: {
                    name: command.name,
                    description: command.description,
                    options: command.commandOptions
                }
            })

            if (command.global == true) {
                client.api.applications(client.user.id).commands.post({
                    data: {
                        name: command.name,
                        description: command.description,
                        options: command.commandOptions
                    }
                })
            }
            client.commands.set(command.name, command);
            console.log(`Commande posté : ${command.name} de ${file} (${command.global ? "global" : "guild"})`)
        }
        console.log("")

        let cmdArrGlobal = await client.api.applications(client.user.id).commands.get()
        let cmdArrGuild = await client.api.applications(client.user.id).guilds('893915741789782067').commands.get()
        cmdArrGlobal.forEach(element => {
            console.log("Commande globale chargée : " + element.name + " (" + element.id + ")")
        });
        console.log("")
        cmdArrGuild.forEach(element => {
            console.log("Commande de guilde chargée : " + element.name + " (" + element.id + ")")
        });
        console.log("")
        console.log("Version de l'API Discord: " + version)
        console.log("")
        console.log("Version de NodeJS: " + process.version)

    });

    client.ws.on('INTERACTION_CREATE', async interaction => {

        if (!client.commands.has(interaction.data.name)) return;

        try {
            client.commands.get(interaction.data.name).execute(interaction);
        } catch (error) {
            console.log(`Erreur de commande: ${interaction.data.name} : ${error.stack}`);
            console.log(`${error.stack}\n`)
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Désolé, une erreur s'est produite lors de l'exécution de cette commande !`
                    }
                }
            })
        }

    })

    client.login(token).then(
        console.log('Bot Loggin'),
        await connect(),
        console.log('\x1b[34mDataBase\x1b[37m connect on \x1b[36mSFPT')

    )
})();

process.on("unhandledRejection", (e) => {
    var errorChannel = client.channels.cache.get("893978765762387968")
    if (!errorChannel) return
    errorChannel.send({ content: `<@805514364277882901>` })
    errorChannel.send({ content: `\`\`\`\n${e.stack}\`\`\`` })
})