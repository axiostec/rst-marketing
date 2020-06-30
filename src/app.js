const express = require('express');
const app = express();
const path = require('path');
const {PORT} = require('./config/index.config');

// config 
app.use(express.json())
   .use(express.urlencoded({
       extended: false
   }))
   .use(express.static(path.join(__dirname, './public')));

// routes
app.use(require('./routes/index.routes'))
   .use(require('./routes/sesion.routes'));

app.listen(PORT, () => {
    console.log(`Server On Port ${PORT}`);
});