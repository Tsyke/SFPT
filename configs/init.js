const nodemailer = require('nodemailer');

module.exports = async(client) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        pool: true,
        tls: {
            rejectUnauthorized: false,
        },
        secure: false,
        auth: {
            user: "ffa48c1ec60ec6",
            pass: "7e24b82f7708ae"
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
            console.log("Server mailer return: " + 501 + `\n\n` + error.stack);
        } else {
            console.log("Server mailer return: " + 200);
            console.log(client)
        }
    });

    return transporter
}