const mongoose = require('mongoose'),
passport = require('passport'),
express = require('express'),
router = express.Router();

const Users = require('../models/user'),
logger = require('../config/winston');

router.post('/login', (req, res, next) => {
    const { body: { user }} = req;
    const newUser = new Users(user);
    passport.authenticate('local-login', (err, user, info) => {
        logger.info({ message: 'inside router POST passport'})
        if(err) return next(err);
        if(user) {
            res.send(user);
        }
        if(!user) res.send(info)
    })(req, res, next)
});

router.post('/signup', (req, res, next) => {
    logger.info({ message: 'inside router POST passport'});
    passport.authenticate('local-signup', (err, user, info) => {
        logger.info({ message: 'inside router POST passport'});
        if(err) return next(err);
        if(user) {
            res.send(info);
        }
        if(!user) res.send(user)
    })(req, res, next)
})

module.exports = router;