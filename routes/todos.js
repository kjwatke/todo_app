const express = require('express');
const router = express.Router();
const { getTodos,
        createTodo,
        getTodo,
        updateTodo,
        deleteTodo
       } = require('../helpers/helpers');

router.route('/')
      .get(getTodos)
      .post(createTodo);

router.route('/:todoId')
      .get(getTodo)
      .put(updateTodo)
      .delete(deleteTodo)
      
module.exports = router;