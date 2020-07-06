const express = require('express');
const path = require('path');
const pool = require('../config/db.config');
const jwt = require('jsonwebtoken');
const uniq = require('uniqid');
const fs = require('fs');
const routes = express.Router();
const { AuthNoVerify, AuthVerify }  = require('../middlewares/auth.middleware');
const { PRIVATE_KEY } = require('../config/index.config');

routes
    .get('/get/pautas', AuthNoVerify, async (req, res) => {
        // obtener pautas publicitarias
        const token = req.session.token.split(' ')[1];
        try{
            const userDecoded = jwt.verify(token, PRIVATE_KEY);
            pool.query(`SELECT * FROM pautas WHERE id_cliente=${userDecoded.id_user}`, (err, result) => {
                if(err){
                    return res.json({error: err});
                }
                return res.json(result);
            })
        }catch(err){
            req.session.token = '';
            res.status(500).redirect('/');
        }
    })
    .post('/upload/pauta', AuthNoVerify, (req, res) => {
        // cargar pauta al server
        if(req.files){
            const pauta = req.files.filePauta;
            if(pauta) {
                const namePauta = pauta.name;
                const uniqId = uniq();
                const rutaPauta = path.join(__dirname, `../audio/${uniqId}-*-${namePauta}`);
                pauta.mv(rutaPauta, err => {
                    if(err){
                        console.error('Error Subiendo Fichero De Pauta Al Servidor -> ' + err);
                        return res.status(500);
                    }
                    const token = req.session.token.split(' ')[1];
                    try{
                        const userDecode = jwt.verify(token, PRIVATE_KEY);
                        const infoPauta = {
                            id_cliente: userDecode.id_user,
                            ruta: rutaPauta,
                            nombre: namePauta
                        }
                        pool.query(`INSERT INTO pautas SET ?`, [infoPauta], (err) => {
                            if(err){
                                console.error('Error guardando registro de puata');
                                return res.status(500).redirect('/');
                            }
                            console.log('pauta cargada');
                            res.redirect('/pautas');
                        });
                    }catch(err){
                        res.status(500).redirect('/');
                    }
                });
            } else {
                res.status(400).redirect('/pautas');
            }
        } else {
            res.status(400).redirect('/pautas');
        }
    })
    .get('/delete/:id', AuthVerify, async (req, res) => {
        const idDelete = req.params.id;
        try{
            const token = req.session.token.split(' ')[1];
            const userDecode = jwt.verify(token, PRIVATE_KEY);
            const infoPauta = {
                id_cliente: userDecode.id_user,
            }
            const infoPautaDelete = await pool.query(`SELECT * FROM pautas WHERE id=${idDelete} AND id_cliente='${infoPauta.id_cliente}'`);
            const rutaPauta = infoPautaDelete[0].ruta;
            fs.unlinkSync(rutaPauta);
            await pool.query(`DELETE FROM pautas WHERE id_cliente='${infoPauta.id_cliente}' AND id='${idDelete}'`);
            res.redirect('/pautas');
        }catch(err){
            res.status(500).redirect('/');
        }
    });

module.exports = routes;