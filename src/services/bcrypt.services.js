const bcrypt = require('bcryptjs');

module.exports = {
    CreateHash: (pass) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt);
        return hash;
    },
    CompareHash: (pass, hash) => {
        return bcrypt.compareSync(pass, hash);
    }
}