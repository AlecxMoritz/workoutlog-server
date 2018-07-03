var express = require('express');
var router = express.Router();
var sequelize = require('../db')
var TestModel = sequelize.import('../models/test')

router.get('/', function(req, res) {
    res.send("Basic Test Route")
});


// refactor to respond with the data added
router.post('/one', function(req, res) {

    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message(data) {
                res.json("TD.One recieve." + data)
            }
        )
})



router.put('/two', function(req, res) {
    res.send("Test Two Success. Fetch type: Put" + ' ... ' + "Spreading mayo")
})

router.delete('/three', function(req, res){
    res.send("Test Three Success. Fetch type: Destroy" + ' .. ' + "Dispatching clowns")
})

router.get('/four', function(req, res) {
    res.send("Test Four Success. Fetch type: Get" + ' ... ' + "Restarting pixels")
})

module.exports = router;