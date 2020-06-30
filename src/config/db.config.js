const mysql = require('mysql');
const { promisify }= require('util');
const { HOST_DB, HOST_NAME_DB, HOST_USER, HOST_PASS } = require('./index.config');


const optionsConn = {
    host: HOST_DB,
    user: HOST_USER,
    password: HOST_PASS,
    database: HOST_NAME_DB
}

const sql = mysql.createPool(optionsConn);

sql.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB Is Connected');

  return;
});

// Promisify Pool Querys
sql.query = promisify(sql.query);

module.exports = sql;