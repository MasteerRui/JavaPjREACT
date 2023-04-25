const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/todo_model.js');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectadooo ruiiiiii'))
  .catch(err => console.error(err));

app.get('/api/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    res.json({ status: 'error' });
  }
});

app.get('/api/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.json({ status: 'error' });
  }
});

app.post('/api/', async (req, res) => {
  console.log(req.body);
  try {
    await Todo.create({
      name: req.body.name,
      date: req.body.date,
      feito: req.body.feito
    });
    res.json({ status: '202' });
  } catch (err) {
    res.json({ status: 'error' });
  }
});

app.put('/api/', async (req, res) => {
  try {
    const oldTodo = await Todo.findById(req.body.id);
    oldTodo.name = req.body.name; 
    oldTodo.date = req.body.date;
    oldTodo.feito = req.body.feito;
    await oldTodo.save();
    res.json(oldTodo);
  } catch (err) {
    res.json({ status: 'error' });
  }
});

app.delete('/api/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ status: '202' });
  } catch (err) {
    res.json({ status: 'error' });
  }
});


app.listen(8080, () => console.log('http://localhost:8080/'));
