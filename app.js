var express = require('express');
var app = express();
var sequelize = require('./db')
var bodyParser = require('body-parser');

//  other

app.use(bodyParser.json());
sequelize.sync();

// controllers 
var test = require('./controllers/testcontroller')
var user = require('./controllers/usercontroller');
var log = require('./controllers/logcontroller')


app.use(require('./middleware/headers'))

// exposed routes
app.use('/test', test)
app.use('/user', user)


// middleware
app.use(require('./middleware/validate-session'))


// validation


//auth'd routes
app.use('/log', log)



// auth'd routes
// app.use('', login);


app.listen(4000, function() {
    console.log("Server is now spining on 4000")
})