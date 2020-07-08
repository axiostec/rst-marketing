const express = require('express');
const path = require('path');
const routes = express.Router();
const { AuthNoVerify }  = require('../middlewares/auth.middleware');

routes
    .get('/', AuthNoVerify, (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/login.html'));
    })
    .get('/inicio', (req, res) => {
        if(req.query.error){
            res.redirect('/');
        }
        res.status(200).sendFile(path.join(__dirname, '../views/pautas.html'));
    })
    .get('/logout', (req, res) => {
        req.session.token = '';
        res.status(200).redirect('/');
    });

module.exports = routes;