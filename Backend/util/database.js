/*
initializes a Sequelize instance configured to connect to a MySQL database and makes it available for use 
in other parts of the application through module exports. 
The actual connection to the database is established when Sequelize methods are invoked during subsequent 
interactions with the exported sequelize object.
*/



const Sequelize = require('sequelize');
const sequelize = new Sequelize('Groupchat', 'root', 'Ajay@1998', {
    dialect:'mysql',

    host: 'localhost'
});
  
module.exports=sequelize;
