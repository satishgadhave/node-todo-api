const expect = require('expect');
const request = require('supertest');

const app = require('./../server').app;
const Todo = require('./../models/todo').Todo;
const ObjectID = require('mongodb').ObjectID;

const todos = [
    {
        _id: new ObjectID(),
        text: "my todo 1"
    },
    {
        _id: new ObjectID(),
        text: "my todo 2"
    }
];

beforeEach( (done) => {
    Todo.remove({}).then( () => { 
        return Todo.insertMany(todos); 
    })
    .then( () => {
        done();
    })
    .catch(console.log);
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = "my todo 1";

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect( (res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[0].text).toBe(text);

                    done();
                })
                .catch( (e) => {
                    done(e);
                });

            });
    });


    it('should not create new todo', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end( (err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);

                    done();
                })
                .catch((e) => {
                    done(e);
                });
            });
            
    });
});

describe('GET /todo/:id', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect( (res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
        });
});

describe('GET /todo/:id', () => {
    it('should get a todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var nonExistingId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${nonExistingId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if invalid object id', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    it('should delete a todo by id', (done) => {
        var id = todos[0]._id.toHexString();
        
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(res.body.todo._id)
                    .then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    })
                    .catch(e => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/5c5a89b59d2a6b72f2411dce`)
            .expect(404)
            .end(done);
    });

    it('should return 400 if invalid object id', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(400)
            .end(done);
    });
});

