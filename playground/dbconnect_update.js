const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to server', err);
    }

    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate({
            _id: new ObjectId('5c56b9e122d79f5e59285d49')
        },
        {
            $set: { name: 'samir' },
            $inc: { age: 2 }
        },
        {
            returnOriginal: false
        }
    )
    .then( (result) => {
        console.log(result);
    });

    // client.close();
});
