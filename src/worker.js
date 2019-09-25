import compression from 'compression'
import express from 'express'
import cors from 'cors'
import flash from 'connect-flash'
import http from 'http'
import handlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path'
import { routes, routesInit } from './routes'
import https from 'https'
import config from './config'
import helmet from 'helmet'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

const expressMongoDb = require('express-mongo-db')

/* 
|--------------------------------------------------------------------------
| ssl config
|--------------------------------------------------------------------------
*/
// var ssl_options = {
//   key: fs.readFileSync('./ssl/.key'),
//   cert: fs.readFileSync('./ssl/.pem'),
//   httpsPort: 8443
// };

/* 
|--------------------------------------------------------------------------
| handlebars templating setup
|--------------------------------------------------------------------------
*/
const hbs = handlebars.create({
  defaultLayout: 'main',
  helpers: {}
})

/* 
|--------------------------------------------------------------------------
| create application / server
|--------------------------------------------------------------------------
*/
const app = express()
const server = http.createServer(app)
//const secureServer = https.createServer(ssl_options, app);

/* 
|--------------------------------------------------------------------------
| environment vars
|--------------------------------------------------------------------------
*/
app.set('port', process.env.PORT || 5000)
app.set('stage', process.env.STAGE)
app.set('assets', '')

/* 
|--------------------------------------------------------------------------
| file upload config
|--------------------------------------------------------------------------
*/
app.use(fileUpload())

/* 
|--------------------------------------------------------------------------
| application middleware
|--------------------------------------------------------------------------
*/
// app.use(function (req, res, next) {
//   console.log(res.error)
//   next()
// })

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(cookieParser())
app.use(flash())
app.use(bodyParser.json({ limit: '50mb', verify: rawBodySaver }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
  })
)
app.use(
  expressMongoDb(
    `mongodb://${config.db.user}:${config.db.password}@${config.db
      .host}:${config.db.port}/${config.db.database}`
  )
)

let connection
if (!app.get('env') || app.get('env') === 'development') {
  connection = mongoose.connect(
    `mongodb+srv://samewave:0jyQ35mOSCvdDW2i@cluster0-1bvhs.mongodb.net/heroku_tvhqf9rt?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
} else {
  connection = mongoose.connect(
    `mongodb://${config.db.user}:${config.db.password}@${config.db
      .host}:${config.db.port}/${config.db.database}`,
    { useNewUrlParser: true }
  )
}

connection.then(db => {
  console.log(`Successfully connected to MongoDB cluster`)
  return db
})

/* 
|--------------------------------------------------------------------------
| Static
|--------------------------------------------------------------------------
*/
//app.use(session({name:'samewave', saveUninitialized:true, resave:false, secure:true, domain:config.domain, secret: '285BDE648ACF7C5F94DCD71HWY765' }));
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static(path.resolve(__dirname, '../static')))

/* 
|--------------------------------------------------------------------------
| routes
|--------------------------------------------------------------------------
*/
routesInit(app)
app.use('/', routes())

/*
|--------------------------------------------------------------------------
| start servers
|--------------------------------------------------------------------------
*/
server.listen(app.get('port'))
console.log('SAMEWAVE API RUNNING...')

/*
|--------------------------------------------------------------------------
| on Worker crashing... 
|--------------------------------------------------------------------------
*/
process.on('uncaughtException', function (err) {
  console.error(err)
  require('forky').disconnect()
})
