var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    name :String,
    username: String,
    password: String,
    role: String
}, {
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const insertUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_user = new User({
            name : dataUser.name,
            username: dataUser.username,
            password: dataUser.password,
            role: dataUser.role
        });
        new_user.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert user to DB!'));
            } else {
                resolve({ message: 'Singn up successfully' , data });
            }
        });
    });
}

router.route('/signup')
    .post((req, res) => {
        console.log(req.body);
        makeHash(req.body.password)
            .then(hashText => {
                const playload = {
                    name : req.body.name,
                    username: req.body.username,
                    password: hashText,
                    role:req.body.role
                }
                console.log(playload);
                insertUser(playload)
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
            })
    });
module.exports = router
