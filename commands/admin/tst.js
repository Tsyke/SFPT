const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "tes",
    async execute(client, message, args) {
        var op;
        op = new MessageSelectMenu()
            .setCustomId('select1')
            .setPlaceholder('Nothing selected'),
            message.guild.channels.cache.forEach(channel => {
                op.addOptions(
                    [{
                        label: `test`,
                        description: `test`,
                        value: `test1`
                    }]
                )
            })
        const row = new MessageActionRow()
            .addComponents(op)



        await message.reply({ content: 'test', components: [row] });
    }
}