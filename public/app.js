
const todoUL = document.querySelector('#todo-list');
const input = document.querySelector('#todo-input');
const form = document.querySelector('form');
let _id;
let map = [];

// On initial load, get all todos from the db and print them to the page.
getTodos();

// Cancel form submission.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
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
        addTodo(todo.name, todo._id, todo.completed);
        map.push({name: todo.name, _id: todo._id, completed: todo.completed});
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
      addTodo(newTodo.data.name, newTodo.data._id, newTodo.data.completed);
      input.value = '';
      addListeners();
    })
    .catch((e) => {
      console.log(e);
    })
  }
}

// Append a new LI item to the DOM.
function addTodo(name, _id, completed) {
  if (name !== 'ValidationError') {
    let del = '<i class="fas fa-trash" id="icon"></i>';
    let item = '<li class="todo">' + name + del + '</li>';
    todoUL.innerHTML += item;
    map.push({name, _id});
  } else {
    alert('this is not a valid todo, please enter a todo');
  }

  todoUL.childNodes.forEach((el) => {
    if (completed) {
      el.classList.toggle('completed');
      console.log('el: ', el);
    }
  });
}

// Delete a todo when a user clicks the trash icon and remove the LI element from the DOM.
function deleteTodo(e) {
  let _id = 0;

  map.forEach((item) => {
    if (item.name.toLowerCase() === e.innerText.toLowerCase()) {
      _id = item._id;
    }
  });
  
  let url = 'api/todos/' + _id;

  axios({
    method: 'delete',
    url: url,
  })
  .then((data) => {
    console.log(data);
  });
}

// Tear down and event listeners that were on from initial page load, add a click listener to all todos on the DOM.
function addListeners() {
  setTimeout(function() {
    todoUL.childNodes.forEach((node) => {
      node.childNodes[1].removeEventListener('click', addListeners);
      node.addEventListener('click', (e) => {
        updateTodo(e.target.innerText)
        e.target.classList.toggle('completed');
      });
      node.childNodes[1].addEventListener('click', (e) => {
        deleteTodo(node);
        node.remove();
      });
    });
  }, 100)
}

function updateTodo(name) {
  let id, url, isDone;
  
  map.forEach((todo) => {
    if (todo.name.toLowerCase() === name.toLowerCase()) {
      id = todo._id;
      todo.completed = !todo.completed;
      isDone = todo.completed;
    }
  });

  url = '/api/todos/' + id;

  axios.put(url, {
    completed: !isDone
  })
  .then((todo) => {
    
    todo.data.completed = !isDone;

  });
}