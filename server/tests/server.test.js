const expect = require('expect');
const request = require('supertest');

const app = require('./../server').app;
const Todo = require('./../models/todo').Todo;

const todos = [
    {
        text: "my todo 1"
    },
    {
        text: "my todo 2"
    }
];

beforeEach( (done) => {
    Todo.remove({}).then( () => { 
        return Todo.insertMany(todos); 
    })
    .then( () => {
        done();
    });
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