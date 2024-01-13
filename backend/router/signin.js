const expressFunction = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = expressFunction.Router();

const key = 'MY_KEY';

var Schema = require("mongoose").Schema;

const userSchema = Schema({
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

const compareHash = async (plaintext, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintext, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare'))
            } else {
                resolve({ status: data });
            }
        })
    });
}

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, data) => {
            if (err) {
                reject(new Error('Cannont find username!'));
            } else {
                if (data) {
                    resolve({ id: data._id, username: data.username, password: data.password ,role:data.role,name:data.name})
                } else {
                    reject(new Error('Cannont find username!'));
                }
            }
        })
    })
}

router.route('/signin')
    .post(async (req, res) => {
        const playload = {
            username: req.body.email,
            password: req.body.password,
        };

        console.log(playload);

        try {
            const result = await findUser(playload.username);
            const loginStatus = await compareHash(playload.password, result.password);
            const status = loginStatus.status;
            console.log("re " , result);
            if (status) {
                const token = jwt.sign(result, key, { expiresIn: 60 * 5 });
                res.status(200).json({ result, token, status });
            } else {
                res.status(200).json({ status });
            }
        } catch (error) {
            res.status(404).send(error);
        }
    })
module.exports = router
