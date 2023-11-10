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
    event.preventDefault();
    console.log("Inside completeToDo");
    
    // PUT request
    axios({
        method: 'PUT',
        url: `/todos/${todoId}`
    }).then((response) => {
        console.log("Completed to-do w/ id", todoId);
        getToDos();
    }).catch((error) => {
        console.log("ERROR in PUT:", error);
    })
    // Add the complete class to the completed todo items
    // event.target.parentElement.parentElement.classList.add('completed');
}

// Remove the given todo item from the todo database
function removeToDo(todoId){
    console.log("Inside removeToDo");

    // Create DELETE route
    axios({
        method: 'DELETE',
        url: `/todos/${todoId}`,
    }).then((response) => {
        console.log("Deleted to-do with id ", todoId);
        // Make sure DOM reflects changes
        getToDos();
    }).catch((error) => {
        console.log("ERROR, could not DELETE todo");
    })
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
        let todoClass = ``;
        let todoStatus = `📝 in progress`;
        if(todo.isComplete){
            todoClass = `class = "completed"`;
            todoStatus = `✅ complete`;
        }
        
        tableBody.innerHTML += `
        <tr ${todoClass} id="toDoItem" data-testid="toDoItem">
            <td>${todoStatus}</td>
            <td>${todo.text}</td>
            <td><button onclick="completeToDo(event, '${todo.id}')" data-testid="completeButton">Complete</button></td>
            <td><button onclick="removeToDo('${todo.id}')" data-testid="deleteButton">Delete</button></td>
        </tr>
        `
    }
}

// Grab the todos first thing
getToDos();
