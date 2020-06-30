const express = require('express');
const path = require('path');
const routes = express.Router();

routes
    .get('/', (req, res) => {
        console.log('/');
        res.status(200).sendFile(path.join(__dirname, '../views/login.html'));
    });

module.exports = routes;