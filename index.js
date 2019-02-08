const express = require('express'),
app = express(),
uuid = require('uuid/v4'),
errorhandler = require('errorhandler'),
cors = require('cors'),
helmet = require('helmet'),
path = require('path'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
session = require('express-session'),
FileStore = require('session-file-store')(session),
mongoose = require('mongoose'),
passport = require('passport');

const logger = require('./config/winston'),
config = require('./config/config'),
apiRouter = require('./routes/auth'),
port = process.env.PORT || 8080,
User = require('./models/user');

isProduction = false;

require('./config/passport')(passport);

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Logger Middleware
app.use(morgan('dev', { "stream": logger.stream }));

//CORS & helmet MiddleWare
app.use(cors());
app.use(helmet());

//Express-session Middleware
app.use(session({
    genid: (req) => {
        logger.info(req.seesionID);
        return uuid();
    },
    store: new FileStore(),
    secret: config.secret,
    resave: false,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Error Handlers & Middleware
if(!isProduction) {
    //app.use(errorhandler);
}

//Connect to MongoDB
try {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.mongoLocal, {
        useNewUrlParser: true
    })
} catch(error) {
    logger.info({ message: `${JSON.stringify(error)}`});
}

//Routes
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log('http://localhost:' + port + "\n" + isProduction + "\n" + config.mongoLocal);
})