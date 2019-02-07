const mongoose = require('mongoose'),
passort = require('passport'),
express = require('express'),
router = express.Router();

router.post('/login', (req, res, next) => {
    const { body: { user }} = req;

    const newUser = new Users(user);
    passport.authenticate('local-login', (err, user, info) => {
        if(err) return next(err);
        if(user) {
            res.send('saved');
        }
    })
});

router.post('/signup', (req, res) => {
    passort.authenticate('local-signup', )
})