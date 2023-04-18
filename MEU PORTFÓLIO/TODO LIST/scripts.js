//SELEÇÃO DE ELEMENTOS
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//FUNÇÕES
const saveTodo = (text, done = 0, save = 1) => {

    const todo = document.createElement("div"); // Criação de "DIV" externa Todo 
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3"); // Criação do Título
    todoTitle.innerText = text; // Continuação do comando da Criação do Título
    todo.appendChild(todoTitle); // Inserindo o h3 no Todo

    const doneBtn = document.createElement("button"); // Para criar Botões
    doneBtn.classList.add("finish-todo"); // Continuação do comando criar botões
    doneBtn.innerHTML = '<i class="fa-solid fa-chech"></i>'; // Pega este texto no arq. HTML
    todo.appendChild(doneBtn); // Inserindo o botão no Todo depois de pronto

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; // Mesmo processo do Botão Anterior
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';  // Mesmo processo do Botão Anterior
    todo.appendChild(deleteBtn);

    if (done) { // Utilizando dados da localStorage
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    todoList.appendChild(todo); // Inserindo o Todo na lista Geral 

    todoInput.value = ""; // Limpar formulário após inserir tarefa
    todoInput.focus(); // Focar o cursor no campo do formulário após inserir tarefa
};

const toggleForms = () => { // Esconde ou Exibe partes de um Formulário
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    editList.classList.toggle("hide");
};

const updateTodo = (Text) => {

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            updateTodoLocalStorage(oldInputValue, text); // Utilizando dados da localStorage
        }
    });
};

//EVENTOS
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value

    if (inputValue) {
        saveTodo(inputValue); //Salvar tarefas
    }
});

document.addEventListener("click", (e) => { // Identificando os botões que foram clicados
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("remove-todo")) { // Identifica o botão de Remoção
        parentEl.remove();

        removeTodoLocalStorage(todoTitle); // Utilizando dados da localStorage
    }

    if (targetEl.classList.contains("edit-todo")) { // Identifica o botão de Edição
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => { // Submeter formulário

    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue) // Atualizar
    }
    toggleForms();
});

const getTodosLocalStorage = () => {  // Local Storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();
