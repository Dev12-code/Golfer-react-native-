const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    dialect: 'postgres'
});

pool.on('connect', () => {
    console.log("Successful DB connection!")
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}