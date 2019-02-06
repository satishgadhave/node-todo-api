var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose').mongoose;
var Todo = require('./models/todo').Todo;
var User = require('./models/user').User;

var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save()
    .then((doc) => {
        res.send(doc);
    })
    .catch( e => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    })
    .catch( (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id) ) {
        return res.status(404).send();
    }

    Todo.findOne({ _id: id})
        .then( (todo) => {

            if(!todo) {
                res.status(404).send();
            }

            res.send( {todo} );
        })
        .catch( e => {
            res.status(400).send();
        });
});


app.listen(8002, () => {
    console.log('Listening on port 8002...');
});

module.exports = { app };

