const express = require('express');
const routes = express.Router();
const { controllerLogin } = require('../controllers/login.controller');

routes
    .post('/login', async (req, res) => {
        console.log('/login(POST)');
        const {
            user,
            pass
        } = req.body;
        const ResultAuth = await controllerLogin(user, pass, res);
        console.log(ResultAuth);
        if(ResultAuth){
            res.status(200).json({
                auth: true
            });
        } else {
            res.redirect('/?err=err');
        }
    });

module.exports = routes;