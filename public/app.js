const todoUL = document.querySelector('#todo-list');

// On initial load, get all todos from the db and print them to the page.
axios('/api/todos')
  .then((res) => {
    res.data.forEach(todo => {
      let item = '<li>' + todo.name + '</li>';
      todoUL.innerHTML += item;
    });
  });
