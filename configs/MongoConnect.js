const { database: { url } } = require('../config.json')

const mongoose = require('mongoose')
const URL = process.env;
let connect = url;
module.exports = async() => {
    await mongoose.connect(connect, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    return mongoose
}