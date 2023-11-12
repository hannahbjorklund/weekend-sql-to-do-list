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
    const t = new Date(Date.now()).toISOString();
    
    // PUT request
    axios({
        method: 'PUT',
        url: `/todos/${todoId}`,
        data: {t}
    }).then((response) => {
        console.log("Completed to-do w/ id", todoId);
        getToDos();
    }).catch((error) => {
        console.log("ERROR in PUT:", error);
    })
}

// Function that will make a confirm popup upon pressing the delete button for a task
function confirmDelete(todoId){
    let result = confirm("Are you sure you want to delete?");
    if(result){
        removeToDo(todoId);
    }
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
        let todoCell = ``;
        if(todo.isComplete){
            // This was for base mode
            todoClass = `class = "completed"`;
            todoStatus = `✅ complete`;
            todoCell = `class = "table-success"`;
        }
        let todoTime = todo.completedAt;
        if(todoTime){
            // Making this more readable to the user
            todoTime = todoTime.toString();
            todoTime = todoTime.replace('T', ' ');
            todoTime = todoTime.slice(0, -8);
        }else{
            todoTime = '-';
        }
        
        tableBody.innerHTML += `
        <tr ${todoClass} id="toDoItem" data-testid="toDoItem">
            <td ${todoCell}>${todoStatus}</td>
            <td ${todoCell}>${todo.text}</td>
            <td ${todoCell}>${todoTime}</td>
            <td ${todoCell}><button class="btn btn-outline-success" onclick="completeToDo(event, '${todo.id}')" data-testid="completeButton">✔️</button></td>
            <td ${todoCell}><button class="btn btn-outline-danger" onclick="confirmDelete('${todo.id}')" data-testid="deleteButton">🗑️</button></td>
        </tr>
        `
    }
}

// Grab the todos first thing
getToDos();
