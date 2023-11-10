console.log('JS is sourced!');

// Gathers user input and sends it to the server to be added to the database
function addToDo(event){
    event.preventDefault();
    console.log("Inside addToDo");

    // Get user input
    let toDoText = document.getElementById('toDoText').value;

    // Create a todo object that we will send to the server
    let newToDo = {text: toDoText};
    console.log("Created a new to-do:", newToDo);

    // POST
    axios({
        method: 'POST',
        url: '/todos',
        data: newToDo
    }).then((response) => {
        // Once we get the okay from the server, we must
        //  re-get the updated to-dos list and render the changes
        console.log("POST request successful, rendering changes");
        getToDos();
    }).catch((error) => {
        console.log("Couldn't execute POST,", error);
    })

    // Clear the user input field
    document.getElementById('toDoText').value = '';

}

// Tells the server to update the isComplete property of the given todo item
function completeToDo(event, todoId){
    console.log("Inside completeToDo")
}

// Remove the given todo item from the todo database
function removeToDo(event, todoId){
    console.log("Inside removeToDo");
}

// Grabs the list of todos from the server, then calls renderToDos
function getToDos(){
    console.log("Inside getToDos");
    // GET route
    axios({
        method: 'GET',
        url: '/todos'
    }).then((response) => {
        console.log("/todos received a GET request", response.data);
        renderToDos(response.data);
    }).catch((error) => {
        console.log("Error in /todos GET request", error);
    });
}

// Displays the current list of todos on the DOM
function renderToDos(todos){
    console.log("Inside renderToDos");
    
    // Get HTML element where we will put the todos
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';

    // Loop through the array of todos and add each to the DOM
    for(let todo of todos){
        tableBody.innerHTML += `
        <tr id="toDoItem" data-testid="toDoItem">
            <td id="todo-status">📝 in progress</td>
            <td>${todo.text}</td>
            <td><button onclick="completeToDo()" data-testid="completeButton">Complete</button></td>
            <td><button onclick="removeToDo()" data-testid="deleteButton">Delete</button></td>
        </tr>
        `
    }
}

// Grab the todos first thing
getToDos();
