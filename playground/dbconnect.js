const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to server', err);
    }

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(result.ops);
    // });

    db.collection('Users').insertOne({
        name: "Rajesh Verma",
        age: 35,
        location: 'Mumbai'
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});
