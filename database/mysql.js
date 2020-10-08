const mysql = require('mysql2')
const config = require('../config/config')

const dbConnection = mysql.createConnection(config.database)

dbConnection.connect((err) => {
    if(err) throw err
    console.log("Database connected")
    dbConnection.promise()
})

module.exports = dbConnection.promise()