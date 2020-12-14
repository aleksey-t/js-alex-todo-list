const newTodoInput = document.getElementById("new-todo-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementsByName('todo-filter');

const todosDataModel = {
    latestId: 1,
    todos: [],
    filterOption: 'all',
};

function addTodo(e) {
    if (e.key === "Enter") {
        e.preventDefault();
    } else {
        return;
    }

    const todoText = e.target.value;

    if (todoText.trim() === "") {
        return;
    }

    const nextTodoId = todosDataModel.latestId + 1;
    todosDataModel.todos.push({
        id: nextTodoId,
        text: todoText,
        isDone: false,
    });
    todosDataModel.latestId = nextTodoId;
    e.target.value = "";

    if (todosDataModel.filterOption === 'done') {
        filter.forEach(
            function (filterItem) {
                if (filterItem.value === 'all') {
                    filterItem.checked = true;
                }
            }
        );
        todosDataModel.filterOption = 'all';
    }

    showTodos();
}

function removeTodo() {
// TODO
}

function toggleTodo(todo) {
    todo.isDone = !todo.isDone;
}

function renameTodo() {
// TODO
}

function clearTodoList() {
    todoList.innerHTML = "";
}

function showTodos() {
    clearTodoList();

    if(!todosDataModel.todos.length){
        todoList.innerHTML = 'В списке дел пока ничего нет.';
    }

    const todosToShow = todosDataModel.todos.filter(
        function (todo) {
            if (todosDataModel.filterOption === 'all') {
                return true;
            } else if (todosDataModel.filterOption === 'to-be-done') {
                return todo.isDone === false;
            } else if (todosDataModel.filterOption === 'done') {
                return todo.isDone === true;
            }
        }
    );

    todosToShow.map(
        function (todo) {
            todoList.innerHTML += `
            <li class="${todo.isDone ? 'done' : ''}">
            <input 
                type="checkbox"
                ${todo.isDone ? 'checked' : ''}
                data-id="${todo.id}"
            />
            <span data-id="${todo.id}">
                ${todo.text}
            </span>
        </li>`;
        }
    );
}

function findTodoById(id) {
    const filteredTodos = todosDataModel.todos.filter(
        function (todo) {
            return todo.id.toString() === id;
        }
    );

    if (filteredTodos.length === 1) {
        return filteredTodos[0];
    }
}

function handleClickTodoList(event) {
    if (event.target.tagName !== 'INPUT') {
        return;
    }

    const id = event.target.getAttribute('data-id');

    if (!id) {
        return;
    }

    const todo = findTodoById(id);
    toggleTodo(todo);

    showTodos();
}

function filterTodos(e) {
    todosDataModel.filterOption = e.target.value;
    showTodos();
}

todoList.addEventListener('click', handleClickTodoList);
newTodoInput.addEventListener('keydown', addTodo);
filter.forEach(function (checkbox) {
        checkbox.addEventListener('click', filterTodos);
    }
);

showTodos();
