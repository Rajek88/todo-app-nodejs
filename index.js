// *************************************** INITIAL EXPRESS SETUP *********************************
const express = require('express');
const path = require('path');
const port = 8000;


//database connections
const db = require('./config/mongoose');

//database model
const Todo = require('./models/todo');

//******************************* Middle ware for parsing json requests ****************************** */
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//set up view engine and middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.use(express.static('assets'));

//accept requests

//************************** INitaially find all todos and load em on main page ******************************** */
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

//********************************* To create a new todo ********************************************************* */
app.post('/create-todo', function(req,res){
    console.log(req.body);
    // console.log(JSON.parse(req.body.category).categoryName);
    Todo.create({
        description : req.body.description,
        category : JSON.parse(req.body.category).categoryName,
        tagColor : JSON.parse(req.body.category).tagColor,
        date : req.body.date,
    }, function(err, newTodo){
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

//** ************************************************** To delete a todo ************************************************ */
//*****  we are getting the list id to delete the list *************************************************** */
app.post('/delete-todo', function(req, res){
    console.log(req.body.todelete);
    let listToDelete = req.body.todelete;
    Todo.findByIdAndDelete(listToDelete,function(err,docs){
        if(err){
            console.log('error deleting list');
            return;
        }
        console.log('Deleted : ', docs);
    })
    return res.redirect('back');
});

//make our app listen to our requests

app.listen(port, function(err){
    if(err){
        console.log('Error : ', err);
    }
    console.log('Express server running on port : ', port);
});