module.exports = async(client, i) => {
    if (i.id === "btn1") {
        await i.reply.defer()
        await console.log("button green")
    }
}