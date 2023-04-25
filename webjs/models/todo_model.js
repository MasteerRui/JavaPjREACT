const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: String,
  date: Date,
  feito: Boolean,
}, {
  timestamps: true
});

todoSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Todo = mongoose.model('Todo', todoSchema, 'todo');

module.exports = Todo;
