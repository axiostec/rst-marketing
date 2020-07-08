const express = require("express");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const pool = require('../config/db.config');
const { AuthVerify } = require("../middlewares/auth.middleware");
const { PRIVATE_KEY } = require("../config/index.config");

routes
    .get('/obtener/tiempo', AuthVerify, async (req, res) =>{
        const token = req.session.token.split(" ")[1];
        try {
            const userDecode = jwt.verify(token, PRIVATE_KEY);
            const id_cliente = userDecode.id_user;
            const tiempo = await pool.query(`SELECT * FROM usuarios WHERE id='${id_cliente}'`);
            res.status(200).json(tiempo[0].config);
        } catch (err) {
            res.status(500).redirect("/");
        }
    })
    .get("/config/tiempo/:config", AuthVerify, async (req, res) => {
        const config = req.params.config;
        const token = req.session.token.split(" ")[1];
        try {
            const userDecode = jwt.verify(token, PRIVATE_KEY);
            const id_cliente = userDecode.id_user;
            switch (config) {
                case 'mas':
                    await pool.query(`UPDATE usuarios SET config = config + 1 WHERE id=${id_cliente} AND config != 10`);
                    res.status(200).json({
                        state: true
                    });
                    break;
                case 'menos':
                    await pool.query(`UPDATE usuarios SET config = config - 1 WHERE id=${id_cliente} AND config != 1`);
                    res.status(200).json({
                        state: true
                    });
                    break;
                default:
                    res.status(400).json({
                        state: false
                    });
                    break;
            }
        } catch (err) {
            res.status(500).redirect("/");
        }
    });

module.exports = routes;
