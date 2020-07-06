const sql = require('../config/db.config');
const { CompareHash } = require('../services/bcrypt.services');

async function controllerLogin(user, pass, res){
    const usuario = await sql.query(`SELECT * FROM usuarios WHERE usuario='${user}'`);
    if(usuario.length){
        const $pass = usuario[0].clave;
        const DatosUser = {
            id_user: usuario[0].id,
            auth: CompareHash(pass, $pass)
        }
        return DatosUser;
    } else {
        return false;
    }
}

module.exports = {
    controllerLogin
}