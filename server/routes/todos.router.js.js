const router = require('express').Router();
const pool = require('../modules/pool');

// GET route that will grab the todo data from the server
router.get('/', (req, res) => {
    console.log("Got a GET request at /todos");

    // Making a SQL query
    let sqlQueryText = `SELECT * FROM "todos";`;

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
    let sqlQueryText = 
    `INSERT INTO "todos" ("text")
    VALUES ($1);`;

    let sqlValues = [newToDo.text];

    pool.query(sqlQueryText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(201);
    }).catch((dbError) => {
        console.log("Error adding new todo:", error);
        res.sendStatus(500);
    })
})
// DELETE route

// PUT route that will update the isComplete property of a todo

module.exports = router;
