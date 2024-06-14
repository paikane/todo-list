let $ = document;

const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");

let todoArray = [];

function addNewTodo() {
  let newTodoTitle = inputElem.value;

  let newObjTodo = {
    id: todoArray.length + 1,
    name: newTodoTitle,
    complete: false,
  };

  inputElem.value = "";

  todoArray.push(newObjTodo);
  setLocalStorage(todoArray);
  todosGenerator(todoArray);

  inputElem.focus()
}

function setLocalStorage(todosList) {
  localStorage.setItem("todos", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  let newLiTodoElem, newLabelTodoElem, newTodoCompleteBtn, newTodoDeleteBtn;

  todoListElem.innerHTML = "";

  todosList.forEach(function (todo) {
    newLiTodoElem = $.createElement("li");
    newLiTodoElem.className = "completed well";

    newLabelTodoElem = $.createElement("label");
    newLabelTodoElem.innerHTML = todo.name;

    newTodoCompleteBtn = $.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute('onclick', 'completeTodo(' + todo.id + ')')

    newTodoDeleteBtn = $.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')

    if (todo.complete){
      newLiTodoElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "Unomplete";
    }

    newLiTodoElem.append(
      newLabelTodoElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );
    todoListElem.append(newLiTodoElem);
  });
}
function removeTodo(todoId){

  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  todoArray = localStorageTodos

  let mainTodoIndex = todoArray.findIndex(function(todo){
    return todo.id === todoId
  })

  todoArray.splice(mainTodoIndex, 1)

  todosGenerator(todoArray)
  setLocalStorage(todoArray)


}

function completeTodo(todoId){
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  todoArray = localStorageTodos

  todoArray.forEach(function(todo){
    if(todo.id === todoId){
      todo.complete = !todo.complete
    }
  })

  setLocalStorage(todoArray)
  todosGenerator(todoArray)
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  if (localStorageTodos) {
    todoArray = localStorageTodos;
  } else {
    todoArray = [];
  }

  todosGenerator(todoArray);
}

function clearTodos() {
  todoArray = [];
  todoListElem.innerHTML = "";
  todosGenerator(todoArray);
  // localStorage.clear();
  localStorage.removeItem("todos");
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
inputElem.addEventListener('keydown', function(event){
  if(event.code === 'Enter'){
    addNewTodo()
  }
})
