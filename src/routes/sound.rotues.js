const express = require("express");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const pool = require('../config/db.config');
const { AuthVerify } = require("../middlewares/auth.middleware");
const { PRIVATE_KEY } = require("../config/index.config");

routes
    .get('/callback/soundcloud')
    .get('/musica/soundclound', AuthVerify, (req, res) => {
        SC.initialize({
            client_id: 'YOUR_CLIENT_ID',
            redirect_uri: 'http://localhost:3000/callback/soundcloud'
          });
    });

module.exports = routes;
