const mongoose = require('mongoose');

var HighlightSchema = mongoose.Schema({
    title: {
        type: String
    },
    year: {
        type: number,
        index: true
    },
    body : {
        type: String
    }
});

var Highlight = module.exports = mongoose.model('Highlight', HighlightSchema);