const sql = require('../config/db.config');
const { CompareHash } = require('../services/bcrypt.services');

async function controllerLogin(user, pass, res){
    const usuario = await sql.query(`SELECT * FROM usuarios WHERE usuario='${user}'`);
    if(usuario.length){
        const $pass = usuario[0].clave;
        return CompareHash(pass, $pass);
    } else {
        return false;
    }
}

module.exports = {
    controllerLogin
}