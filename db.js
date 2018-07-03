const Sequelize = require('sequelize');

const sequelize = new Sequelize('newWorkoutLog', 'postgres', 'ghastb0i', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log("You are now Connected. Keep your head on.");
    },
    function(err){
        console.log(err)
    }
);

module.exports = sequelize;