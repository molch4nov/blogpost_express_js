const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "caraonelove1",
    host: "localhost",
    port: 5432,
    database: ""
})

module.exports = pool;