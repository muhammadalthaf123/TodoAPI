const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});


let todos = []; 


app.get('/todos', (req, res) => {
    res.json(todos);
});


app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});


app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = req.body.title;
        res.json(todo);
    } else {
        res.status(404).send('Todo not found');
    }
});


app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Todo not found');
    }
});

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
});
