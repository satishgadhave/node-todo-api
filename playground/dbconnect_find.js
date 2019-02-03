const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to server', err);
    }

    const db = client.db('TodoApp');

    db.collection('Users').find({name: 'Rajesh Verma'}).toArray().then((docs) => {
        console.log(docs);
    });

    client.close();
});
