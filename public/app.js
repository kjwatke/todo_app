
const todoUL = document.querySelector('#todo-list');
const input = document.querySelector('#todo-input');
const form = document.querySelector('form');

// On initial load, get all todos from the db and print them to the page.
getTodos();


  // Cancel form submission.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // On submit, add a new todo to the database and then append the new item to the page for the user to view.
input.addEventListener('keypress', (e) => {
  postTodos(e);
});
  
// Retrieve the current todos from the database.
function getTodos () {
  axios('/api/todos')
    .then((res) => {
      res.data.forEach(todo => {
        addTodo(todo.name)
      });
    });
}

// Create a post request to post the new todo to the database.
function postTodos(e) {
  if (e.which === 13) {
   axios({
      method: 'post',
      url: '/api/todos',
      data: { name: input.value }
    })
    .then((newTodo) => {
      addTodo(newTodo.data.name);
    })
    .catch((e) => {
      console.log(e);
    })
  }
}

// Append a new LI item to the DOM.
function addTodo(name) {
  let item = '<li>' + name + '</li>';
  todoUL.innerHTML += item;
}