const { License } = require("tokeylic-gen");

module.exports = {
    name: "create-license",
    permission: "ADMINISTRATOR",

    async execute(client, message) {
        var key;
        key = await client.urgence.findOne({ serverID: message.guild.id })
        if (key) return message.reply({ content: "<:off:898618152647262248> | License SFPT déjà active." })
        if (!key) {
            var Key = new License({
                keyOptions: {
                    useNumbers: true,
                    useSymbols: false,
                    caps: "mix",
                },
                licenseOptions: {
                    prefix: "SFPT",
                    partSeparator: "_",
                    useParts: true,
                    numberOfParts: 5,
                    minPartLength: 3,
                    maxPartLength: 5
                }
            }).gen()
            key = new client.urgence({
                userID: message.author.id,
                serverID: message.guild.id,
                botLicense: Key
            });
            key.save()
            message.reply({ content: "<:on:898618163221135430> | La license de ce serveur à été crée avec succès.\nLa clé: ```" + Key + "```" })
        }
    }
}