const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const { PORT, PRIVATE_KEY_SESSION } = require('./config/index.config');
const { AuthVerify } = require('./middlewares/auth.middleware');
const cors = require('cors');

// config 
app.use(express.json())
    .use(express.urlencoded({
        extended: false
    }))
    .use(express.static(path.join(__dirname, './public')))
    .use(session({
        secret: PRIVATE_KEY_SESSION,
        resave: true,
        saveUninitialized: true
    }))
    .use(fileUpload())
    .use(cors());

// middlewares
app.use(AuthVerify);

// variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// routes
app.use(require('./routes/index.routes'))
   .use(require('./routes/sesion.routes'))
   .use(require('./routes/pautas.routes'))
   .use(require('./routes/config.routes'))
   .use(require('./routes/spotify.routes'));

app.listen(PORT, () => {
    console.log(`Server On Port ${PORT}`);
});