const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const { PORT, PRIVATE_KEY_SESSION } = require('./config/index.config');
const { AuthVerify } = require('./middlewares/auth.middleware');

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
    }));

// middlewares
app.use(AuthVerify);

// variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

// routes
app.use(require('./routes/index.routes'))
   .use(require('./routes/sesion.routes'));

app.listen(PORT, () => {
    console.log(`Server On Port ${PORT}`);
});