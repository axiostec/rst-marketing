const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/index.config');

module.exports = {
    AuthVerify: (req, res, next) => {
        console.log(req.path);
        if(req.path != '/' && req.path != '/login'){
            if(req.session.token){
                const token = req.session.token.split(' ')[1];
                jwt.verify(token, PRIVATE_KEY, (err, verify) => {
                    if(err) {
                        return res.status(403).redirect('/');
                    }
                    if(verify){
                        next();
                    }
                }); 
            }else{
                res.status(403).redirect('/');
            }
        } else {
            next();
        }
    }
}