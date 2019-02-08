const mongoose = require('mongoose'),
bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.createUser = function(newUser, cb) {
    bcrypt.hash(newUser.password, 10)
    .then(hash => {
        newUser.password = hash;
        newUser.save(cb);
    })
}

var User = module.exports = mongoose.model('User', UserSchema);