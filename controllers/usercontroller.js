require('dotenv').config();


var express = require('express');
var sequelize = require('../db')
var router = express.Router();
var User = sequelize.import('../models/user')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// User.sync({Force: true}) to drop your table. keep this
// commented out

router.get('/', function(rea, res) {
    console.log("get recieved")
    res.send("Basic User Route Test")
})

router.post('/signup', function(req, res) {
    var userName = req.body.user.username;
    var userPass = req.body.user.password;
    var userType = req.body.user.usertype;

    User.create({
        username: userName,
        passwordhash: bcrypt.hashSync(userPass, 10),
        usertype: userType,
    })
    .then( 
        function signupSuccess(user){
        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})  /// left off here
            res.json({
                user: user,
                message: "User created",
                sessionToken: token
            })
        },
        function(req, res) {
            res.status(500, err.message)
        }
    )
})


// /user/login/


router.post('/login', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } ).then(
    function(user) {
        if(user) {
            bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                if(matches) {
                    console.log("Matched")
                    console.log(user)
                    var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: "Successful Logged In",
                        sessionToken: token
                    });
                } else {
                    res.status(401).send({ message: "Passwords did not match"});
                }
            });
        } else {
            res.status(400).send({ error: "User does not exist"});
        }
    },
    function (err) {
        res.status(500).send({ error: "Fetch failed."})
    }
    );
});



// find all users
router.get('/users', function(req, res) {

    User
    .findAll()
    .then(
        function usersSuccess(data){
            res.json(data)
        },
        function usersError(err){
            res.send(500, err.message)
        }
    )
})



//  future upadte username?


router.put('/update', function(req,res) {
    res.send("User Update Route Test. Request Type: Put" + " ..." + "Raiding Fridge")
})


// future delete account


router.delete('/delete', function(req, res) {
    res.send("User Delete Route Test. Request Type: Delete" + " ... " + "Bailing convicts")
})




module.exports = router;