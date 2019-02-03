const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to server', err);
    }

    const db = client.db('TodoApp');

    // db.collection('Users').deleteMany({
    //     name: 'Rajesh Verma'
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectId('5c56b9d26ce7a65e51e2896f')
    })
    .then(result => {
        console.log(result);
    });

    // client.close();
});
