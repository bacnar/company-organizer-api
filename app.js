require('dotenv').config()
const Koa = require('koa')
const koaBody = require('koa-body')
const logger = require('koa-morgan')
const config = require('./config/config')
const cors = require('@koa/cors');

const app = new Koa()

app.use(cors());
app.use(koaBody())
app.use(logger('dev', {
  // skip: function (req, res) { return res.statusCode < 400 }
}))

const roles = require('./routes/roles.js')
const users = require('./routes/users.js')
const stations = require('./routes/stations.js')

app.use(roles.routes())
app.use(users.routes())
app.use(stations.routes())

app.listen(config.port)
console.log("Api is runing on port", config.port)
