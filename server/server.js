const express = require('express');
const app = express();

const todos = require('./routes/todos.router.js');

const PORT = process.env.PORT || 5001;
const someSecret = process.env.MY_SUPER_SECRET;

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.static('./server/public'));
app.use(express.json());

app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
