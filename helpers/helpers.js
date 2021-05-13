const db = require('../models');

exports.getTodos = function(req, res) {
  db.Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.send(err);
    });
}

exports.createTodo = function(req, res) {
  db.Todo.create(req.body)
    .then((newTodo) => {
      res.status(201).json(newTodo);
    })
    .catch((err) => {
      res.send(err);
    });
}

exports.getTodo = function(req, res) {
  db.Todo.findById(req.params.todoId)
    .then((foundTodo) => {
      res.json(foundTodo);
    })
    .catch((err) => {
      res.send(err);
    })
  }

exports.updateTodo = function (req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
      .then((todo) => {
        res.json(todo);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  exports.deleteTodo = function (req, res) {
    db.Todo.remove({_id: req.params.todoId})
      .then((item) => {
        res.json('item with id of: ' + req.params.todoId + ' was deleted successfully');
      })
      .catch((err) => {
        res.send(err);
      });
  }