const inputForm = document.querySelector('#todo-input');
const preview = document.querySelector('#preview');

// Live preview. Copy the value of the input form into element for user to see as they type.
inputForm.addEventListener('input', (e) => {
  preview.innerHTML = `<span>${inputForm.value}</span>`
});





