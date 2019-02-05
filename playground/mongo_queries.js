const ObjectId = require('mongodb').ObjectID;
const mongoose = require('./../server/db/mongoose').mongoose;
const Todo = require('./../server/models/todo').Todo;

const id = '5c56d4b65a600f630aac2240';
//console.log('test');

Todo.find({
    _id: new ObjectId('5c56d4b65a600f630aac2240')
})
.then( (todos) => {
    console.log(todos);
})
.catch( e => console.log(e) );