const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {
    PORT: process.env.PORT,
    HOST_DB: process.env.HOST_DB,
    HOST_USER: process.env.HOST_USER,
    HOST_PASS: process.env.HOST_PASS,
    HOST_NAME_DB: process.env.HOST_NAME_DB
}