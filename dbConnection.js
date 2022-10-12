const { Client } = require('pg')
const client = new Client({
  user: 'development',
  host: `smarth.cbvyusbuqyjt.ap-south-1.rds.amazonaws.com`,
  database: 'smartHDB',
  password: 'Credflow!11',
  port: 5432,
})

module.exports = client;