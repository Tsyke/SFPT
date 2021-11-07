const { MessageEmbed } = require("discord.js");

const raidmodeMsg = new Map();
const raidmodeChannel = new Map();
const raidmodeRole = new Map();
var raidmodePassif = false;

module.exports = async(client) => {
    // console.log(channel)

    // if (message) {
    //     console.log("m")
    //         // if (raidmodeMsg.has(message.author.id)) {
    //         //     const msg = raidmodeMsg.get(message.author.id)
    //         //     raidmodeMsg.set(message.author.id, msg + 1);
    //         //     if (msg === 5) {
    //         //         if (message.author.id !== message.guild.ownerId) {
    //         //             raidmodePassif = true
    //         //         }
    //         //     }


    //     // } else {
    //     //     raidmodeMsg.set(message.author.id, 1)
    //     // }
    // }
    // // if (channel) {
    // //     console.log("c")
    // // }
    // // if (role) {
    // //     console.log("r")
    // // }

    // if (raidmodePassif === true) {
    //     var i = 0;
    //     if (channel) {
    //         i++
    //         channel.delete()
    //     }
    //     if (message) {
    //         i++
    //         message.delete()
    //     }
    //     if (role) {
    //         i++
    //         role.delete()
    //     }
    //     var membre = 0
    //     if (member) {
    //         membre++
    //     }
    //     let date_ob = new Date();
    //     let date = ("0" + date_ob.getDate()).slice(-2);
    //     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    //     if (month = 1) month = "Janvier"
    //     if (month = 2) month = "Février"
    //     if (month = 3) month = "Mars"
    //     if (month = 4) month = "Avril"
    //     if (month = 5) month = "Mai"
    //     if (month = 6) month = "Juin"
    //     if (month = 7) month = "Juillet"
    //     if (month = 8) month = "Août"
    //     if (month = 9) month = "Septembre"
    //     if (month = 10) month = "Octobre"
    //     if (month = 11) month = "Novembre"
    //     if (month = 12) month = "Décembre"
    //     let year = date_ob.getFullYear();
    //     let hours = date_ob.getHours();
    //     let minutes = date_ob.getMinutes();
    //     let datee = date + " " + month + " " + year + " à: " + hours + "h" + minutes
    //     var endEmbed = new MessageEmbed()
    //         .setDescription("Résumé du raid du:" + datee)
    //         .setColor("GREEN")
    //         .addFields({
    //             name: "Nombre d'interaction",
    //             value: `\`${i}\` actions on était faites durant le raid`
    //         }, {
    //             name: 'Nombre de membres qui ont rejoins:',
    //             value: `\`${membre}\` ont rejoins durant le raid`
    //         }, {
    //             name: "Durée du raid:",
    //             value: `Le raid a duré: ${time}`
    //         })
    // }


}