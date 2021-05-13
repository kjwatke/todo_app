const todoUL = document.querySelector('#todo-list');
const input = document.querySelector('#todo-input');
const form = document.querySelector('form');

// On initial load, get all todos from the db and print them to the page.
axios('/api/todos')
  .then((res) => {
    res.data.forEach(todo => {
      let item = '<li>' + todo.name + '</li>';
      todoUL.innerHTML += item;
    });
  });


  // Cancel form submission.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
