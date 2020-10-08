const config = {
  port: process.env.PORT || 8080,
  database: {
    host: process.env.DB_HOST || "url",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB || "test_db"
  }
} 

module.exports = config
