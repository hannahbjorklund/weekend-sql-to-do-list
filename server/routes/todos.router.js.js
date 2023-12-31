const router = require('express').Router();
const pool = require('../modules/pool');

// GET route that will grab the todo data from the server
router.get('/', (req, res) => {
    console.log("Got a GET request at /todos");

    // Making a SQL query
    // Order it so completed to-dos are sent to bottom
    let sqlQueryText = `SELECT * FROM "todos"
        ORDER BY "isComplete";`;

    // Send the query to the db
    pool.query(sqlQueryText)
    .then((dbResult) => {
        console.log('dbResult.rows:', dbResult.rows);
        res.send(dbResult.rows);
    }).catch((dbError) => {
        console.log("Error in GET:", dbError);
        res.sendStatus(500);
    })
})

// POST route that will send a new todo to the server
router.post('/', (req, res) => {
    let newToDo = req.body;

    // The dollar sign syntax will prevent SQL injection attempts
    const sqlQueryText = 
    `INSERT INTO "todos" ("text")
    VALUES ($1);`;

    const sqlValues = [newToDo.text];

    pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201);
    }).catch((dbError) => {
        console.log("Error adding new todo:", error);
        res.sendStatus(500);
    })
})

// DELETE route
router.delete('/:id', (req, res) => {
    let toDoToDelete = req.params.id;
    const sqlQueryText = `
    DELETE FROM "todos"
        WHERE "id" = $1;`;
    
    const sqlValues = [toDoToDelete];

    pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(200);
    }).catch((dbError) => {
        console.log("Oh god the DELETE didn't work");
        res.sendStatus(500);
    })
})

// PUT route that will update the isComplete property of a todo
router.put('/:id', (req, res) => {
    let toDoToComplete = req.params.id;
    let timestamp = req.body;
    console.log("TIMESTAMP", timestamp);
    
    const sqlQueryText = `
    UPDATE "todos"
        SET "isComplete" = true, "completedAt" = $1
        WHERE "id" = $2;`;
    
    const sqlValues = [timestamp.t, toDoToComplete];

    pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201);
    }).catch((dbError) => {
        console.log("ERROR in PUT:", dbError);
        res.sendStatus(500);
    })
})

module.exports = router;
