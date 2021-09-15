const express = require('express');
const path = require('path');
const port = 8000;


//database connections
const db = require('./config/mongoose');

//database model
const Todo = require('./models/todo');

const app = express();


//set up view engine and middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.use(express.urlencoded());
app.use(express.static('assets'));

//accept requests

app.get('/', function(req, res){

    Todo.find({}, function(err, allTodos){
        if(err){
            console.log('Error fetching todo stuff : ', err);
            return;
        }
        return res.render('home',{
            todo_list : allTodos,
        });
    })
});

app.post('/create-todo', function(req,res){
    Todo.create(req.body, function(err, newTodo){
        if(err){
            console.log('Error creating to do task : ', err);
        }
        else{
            console.log('Created a task successfully : ', newTodo);
        }
        return;
    });

    return res.redirect('back');
});

//make our app listen to our requests

app.listen(port, function(err){
    if(err){
        console.log('Error : ', err);
    }
    console.log('Express server running on port : ', port);
});