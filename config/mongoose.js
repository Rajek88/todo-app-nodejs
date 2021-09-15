//rewuire the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/todo_list_db');

//acquire the connection access
const db = mongoose.connection;

//check if connection is successful or not
db.on('error', console.error.bind(console, 'Connection to database failed'));
db.once('open', function(){
    console.log('Successfully Connected to database :: MongoDB');
});