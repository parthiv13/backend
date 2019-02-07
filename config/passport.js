const mongoose = require('mongoose'),
passport = require('passport'),
LocalStrategy = require('passport-local');

const Users = require('../models/user'),
logger = require('../config/winston');

//passport session setup
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    })
});

//LOCAL SIGNUP
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (email, password, done) => {
    Users.findOne({ email: email})
    .then(user => {
        if(user) {
            return done(null, false, {errors: {'email': 'is taken'}});
        } else {
            let newUser = new Users();
            newUser.email = email;
            newUser.password = password;
            Users.createUser(newUser, (err) => {
                if(err) {
                    logger.info({ message: err.message});
                    return done(null, false, {errors: err});
                }
                return done(null, newUser);
            })
        }
    });
}))

//LOCAL LOGIN
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, (email, password, done) => {
    Users.findOne({email: email})
    .then(user => {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }
        return done(null, user);
    }).catch(done);
}))