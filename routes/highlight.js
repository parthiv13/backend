const mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

const logger = require('../config/winston'),
    Highlight = require('../models/highlight');

router.get('/:id', (req, res) => {
    Highlight.findOne({ year: req.params.id })
    .then(doc => {
        if(doc) {
            res.send(doc);
        } else {
            res.send('Refresh Again')
        }
    })
});