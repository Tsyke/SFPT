const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "top-invite",
    aliases: "ti",

    async execute(client, message) {
        let invites = await message.guild.invites.fetch();
        if (invites.size === 0) return ctx.send("Pas d'invite");
        var code = ""
        invites = invites.sort((a, b) => b.uses - a.uses).map(invite => "Créateur du lien:" + (!invite.inviter ? "Unknow user" : invite.inviter.username) + "\n" + "Lien d'invitation: https://discord.gg/" + invite.code + "\n" + "Nombre d'utilisation: `" + invite.uses + "`\n\n").slice(0, 10).join("\n");
        message.reply({
            embeds: [new MessageEmbed()
                .setColor("BLUE")
                .addFields({
                    name: `Top Invite du serveur ${message.guild.name}`,
                    value: invites,
                    inline: false
                })
            ]
        })
    }
}