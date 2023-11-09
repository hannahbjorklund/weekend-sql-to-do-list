const router = require('express').Router();
const pool = require('../modules/pool');

// GET route that will grab the todo data from the server
router.get('/', (req, res) => {
    console.log("Got a GET request at /todos");

    // Making a SQL query to send to the database
    let sqlQueryText = `
    SELECT * FROM "todos"
    `

    // Send the query to the db
    pool.query(sqlQueryText)
    .then((dbResult) => {
        console.log('dbResult.rows:', dbResult.rows)
        res.send(dbResult.rows)
    }).catch((dbError) => {
        res.sendStatus(500);
    })
})

// POST route that will send a new todo to the server

// DELETE route

// PUT route that will update the isComplete property of a todo

module.exports = router;
