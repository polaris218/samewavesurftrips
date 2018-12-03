'use strict';

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _routes = require('./routes');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import models from './models';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var expressMongoDb = require('express-mongo-db');

var SequelizeStore = require('connect-session-sequelize')(_expressSession2.default.Store);
var csrf = require('csurf');

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
var hbs = _expressHandlebars2.default.create({
  defaultLayout: 'main',
  helpers: {}
});

/* 
|--------------------------------------------------------------------------
| create application / server
|--------------------------------------------------------------------------
*/
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
//const secureServer = https.createServer(ssl_options, app);

/* 
|--------------------------------------------------------------------------
| environment vars
|--------------------------------------------------------------------------
*/
app.set('port', process.env.PORT || 5000);
app.set('stage', process.env.STAGE);
app.set('assets', '');

/* 
|--------------------------------------------------------------------------
| application middleware
|--------------------------------------------------------------------------
*/

var rawBodySaver = function rawBodySaver(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_api2.default));
app.use((0, _helmet2.default)());
app.use((0, _cors2.default)());
app.use((0, _compression2.default)());
app.use((0, _cookieParser2.default)());
app.use((0, _connectFlash2.default)());
app.use(_bodyParser2.default.json({ limit: '50mb', verify: rawBodySaver }));
app.use(_bodyParser2.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

/* 
|--------------------------------------------------------------------------
| sessions
|--------------------------------------------------------------------------
*/
app.use((0, _expressSession2.default)({ name: 'samewave', saveUninitialized: true, resave: false, secure: true, domain: _config2.default.domain, secret: '285BDE648ACF7C5F94DCD71HWY765' }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(_express2.default.static(_path2.default.resolve(__dirname, '../static')));
app.use(csrf());
app.use(expressMongoDb('mongodb://' + _config2.default.db.user + ':' + _config2.default.db.password + '@' + _config2.default.db.host + ':' + _config2.default.db.port + '/' + _config2.default.db.database));

/* 
|--------------------------------------------------------------------------
| routes
|--------------------------------------------------------------------------
*/
(0, _routes.routesInit)(app);
app.use('/', (0, _routes.routes)());

/*
|--------------------------------------------------------------------------
| start servers
|--------------------------------------------------------------------------
*/
server.listen(app.get('port'));
console.log('SAMEWAVE API RUNNING...');

/*
|--------------------------------------------------------------------------
| on Worker crashing... 
|--------------------------------------------------------------------------
*/
process.on('uncaughtException', function (err) {
  console.error(err);
  require('forky').disconnect();
});