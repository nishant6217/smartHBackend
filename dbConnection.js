const { Client } = require('pg')
const client = new Client({
  user: 'development',
  host: process.env.DB_HOST,
  database: 'smartHDB',
  password: process.env.DB_PASSWORD,
  port: 5432,
})

module.exports = client;