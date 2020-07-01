const express = require('express');
const jwt = require('jsonwebtoken');
const routes = express.Router();
const { AuthNoVerify }  = require('../middlewares/auth.middleware');
const { controllerLogin } = require('../controllers/login.controller');
const { PRIVATE_KEY } = require('../config/index.config');

routes
    .post('/login', AuthNoVerify, async (req, res) => {
        console.log('/login(POST)');
        const {
            user,
            pass
        } = req.body;
        const ResultAuth = await controllerLogin(user, pass, res);
        console.log(ResultAuth);
        if(ResultAuth){
            const token = jwt.sign({user, pass}, PRIVATE_KEY);
            req.session.token = 'Token-Privado ' + token;
            res.status(201).redirect('/inicio');
        } else {
            res.redirect('/?err=err');
        }
    });

module.exports = routes;