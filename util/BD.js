const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    host : 'localhost',
    port: 3306,
    password: '',
    user: 'root',
    database: 'e_commerce',
    connectionLimit:10
})

pool.query = util.promisify(pool.query);
module.exports = pool;