
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
    addListeners();
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
      input.value = '';
      addListeners();
    })
    .catch((e) => {
      console.log(e);
    })
  }
}

// Append a new LI item to the DOM.
function addTodo(name) {
  let icon = '<i class="fas fa-trash" id="icon"></i>';
  let item = '<li class="todo">' + name + icon + '</li>';
  todoUL.innerHTML += item;
}

function deleteTodo(e) {
  console.log(e);
}


function addListeners() {
  setTimeout(function() {
    todoUL.childNodes.forEach((node) => {
      node.childNodes[1].removeEventListener('click', addListeners)
      node.childNodes[1].addEventListener('click', (e) => {
      });
    });
  }, 100)
}