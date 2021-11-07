module.exports = {
    name: 'maj',
    permission: "ADMINISTRATOR",
    owner: false,
    aliases: "Aucun",

    async execute(client, message, args) {
        if (message.member.id !== "805514364277882901") return
        var option;
        option = args[0];
        var guilddoc = await client.guild.find()
        try {
            if (option === "db") {
                var option2;
                option2 = args[1];
                if (option2) {
                    var option3;
                    option3 = args[2];
                    var i;
                    i = 0;
                    var msg = await message.reply({ content: "<:passif:906545092486111302> | Mise à jour en cours. Merci de patienter..." })
                    async function asyncForEach(array, callback) {
                        for (let index = 0; index < array.length; index++) {
                            await callback(array[index], index, array);
                        }
                    }
                    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
                    const startGuildData = async() => {
                        await asyncForEach(guilddoc, async(guild) => {
                            await waitFor(50);
                            await client.guild.findOneAndUpdate({ guildID: guild.guildID }, { $set: { option2: option3 } })
                            i++
                        });
                        msg.delete()
                        message.channel.send({ content: `<:on:898618163221135430> | L'option \`${option2}\` à étais ajouter sur \`${i}\` serveurs avec comme paramètre: \`${option3}\`` })

                    }
                    startGuildData();
                }
            }
        } catch (e) {
            msg.delete()
            console.log(e)
            message.reply({ content: "<:off:898618152647262248> | Une erreur s'est produite..." })
        }
    }
}