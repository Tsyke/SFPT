 module.exports = (message, reason) => {
     if (!reason) throw new TypeError("Error isn't specified")
     value = message.reply(`Erreur interne, veuillez réinviter le bot si le problème persiste. (${reason})`)
     return value;
 }