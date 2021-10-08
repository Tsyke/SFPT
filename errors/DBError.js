module.exports = async(message, reason) => {
    if (!reason) throw new TypeError("Error isn't specified")
    var DBErrorString;
    DBErrorString = message.reply(`Erreur interne, veuillez réinviter le bot si le problème persiste. (${reason})`);
    return DBErrorString
}