module.exports = async(client, message) => {
    var GuildData = await client.GetGuildData(message.guild.id)
    const prefix = GuildData.prefix
    if (!message.author.bot) {

        if (message.content.startsWith(prefix)) {

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            const data = {};
            if (cmd) cmd.execute(client, message, args, data);
        }

    }
};