const express = require('express');
const uuid = require('uuid');

class Todo {
    constructor(title = "", desc = "", id = uuid()){
        this.title = title;
        this.desc = desc;
        this.id = id;
    }
};

const stor = {
    todo: [],
};

const app = express();

app.use(express.json());

app.get('/api/todo', (request, response) => {
    const {todo} = stor;
    response.json(todo)
})

app.get('/api/todo/:id', (request, response) => {
    const {todo} = stor;
    const {id} = request.params
    const {index} = todo.findIndex((el) => el.id === id)
    if(~index)
        response.json(todo)
    else {
        response.status(404);
        response.json("404 || Not found")
    }
    
})

app.post('/api/todo', (request, response) => {
    const {todo} = stor;
    const {title, description} = request.body;

    const newTodo = new Todo(title, description);
    todo.push(newTodo);

    response.status(201);
    response.json(newTodo);
})

app.put('/api/todo/:id', (request, response) => {
    const {todo} = stor;
    const {title, description} = request.body;

    const index = todo.findIndex(el => el.id === id)

    if (~index){
        todo[index] = new Todo(title, description);
        response.status(201);
        response.json(todo[index]);
    }
    else{
        response.status(404)
    }
})

app.delete('/api/todo/:id', (request, response) => {
    
})

const PORT = process.env.port || 3000;
app.listen(3000);