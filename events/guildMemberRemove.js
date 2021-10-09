const ultrax = require('ultrax')
module.exports = async(client, member) => {
    console.log('Il est arrivé wesh')
    const guild = await client.GetGuildData(member.guild.id)

    //? UserWelcome
    console.log(guild.UserWelcome)
    if (guild.UserWelcome === true) {
        let bg = guild.image_url
        let avatar = member.user.displayAvatarURL({ format: "png" })
        let text1 = "Au revoir"
        let text2 = member.user.tag
        let text3 = `Nous sommes désormais ${member.guild.memberCount} membres`
        let color = '#ffffff'
        const options = {

            attachmentName: `bye-${member.id}`,
            text1_fontSize: 80,
            text2_fontSize: 50,
            text3_fontSize: 30
        }

        const image = await ultrax.welcomeImage(bg, avatar, text1, text2, text3, color, options)

        let bvn = await guild.channel_bye
        let channel = member.guild.channels.cache.get(`${bvn}`)
        channel.send({
            files: [image]
        })
    }
}