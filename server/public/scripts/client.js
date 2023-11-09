console.log('JS is sourced!');

// Gathers user input and sends it to the server to be added to the database
function addToDo(event){
    event.preventDefault();
    console.log("Inside addToDo");
}

// Tells the server to update the isComplete property of the given todo item
function completeToDo(event, todoId){
    console.log("Inside completeToDo")
}

// Remove the given todo item from the todo dattabase
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
}

getToDos();
