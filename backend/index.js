//index.js is a bad name for a file, but everyone uses it, so to keep with convention, I used this name.
//This file contains the server and API endpoints for node.js using Express
import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import pg from 'pg';
// //import express
// const express = require('express')
// //import cors
// const cors = require('cors')
// const { v4: uuid } = require('uuid');

/*
create an instance of an express application, which lets you do things such as 
set API endpoints for URLs, specifying GET, POST, PUT, DELETE, and also start
the server via app.listen()
*/
const app = express()

//uses cors headers to allow requests between servers
app.use(cors())
app.use(express.json());


async function getAllFromDatabase(username) {
    //create client
    const client = new pg.Client({
        user: 'wesleyliu',
        database: 'postgres',
        password: 'wesleyliu', 
        port: 5432,
    });

    //connect client
    await client.connect()

    const tableName = 'todos';
    const queryText = 'SELECT * FROM ' + tableName + ' WHERE username = $1';
    const values = [username];

    const res = await client.query(queryText, values);
    console.log(res);
    
    //close connection
    await client.end()

    return res.rows;
}

async function insertIntoDatabase(username, id, task) {
    //create client
    const client = new pg.Client({
        user: 'wesleyliu',
        database: 'postgres',
        password: 'wesleyliu', 
        port: 5432,
    });

    //connect client
    await client.connect()

    const tableName = 'todos';
    const queryText = 'INSERT INTO ' + tableName + ' (id, username, task) VALUES ($1, $2, $3)';
    const values = [id, username, task];

    const res = await client.query(queryText, values);
    console.log(res);
    
    //close connection
    await client.end()
}

async function removeFromDatabase(id, username) {
    //create client
    const client = new pg.Client({
        user: 'wesleyliu',
        database: 'postgres',
        password: 'wesleyliu', 
        port: 5432,
    });

    //connect client
    await client.connect()

    const tableName = 'todos';
    const queryText = 'DELETE FROM ' + tableName + ' WHERE id = $1 AND username = $2';
    const values = [id, username];

    const res = await client.query(queryText, values);
    console.log(res);
    
    //close connection
    await client.end()
}


async function toggleCompleteDatabase(id, username) {
    //create client
    const client = new pg.Client({
        user: 'wesleyliu',
        database: 'postgres',
        password: 'wesleyliu', 
        port: 5432,
    });

    //connect client
    await client.connect()

    const tableName = 'todos';
    const queryText = 'UPDATE ' + tableName + ' SET completed = NOT completed WHERE id = $1 AND username = $2';
    const values = [id, username];

    const res = await client.query(queryText, values);
    console.log(res);
    
    //close connection
    await client.end()
}


/*
This app.get() below takes two arguments.

1st argument: '/'
This first argument tells us which API endpoint is going to be used. When we send a get request to this backend,
we would send a get request for URL --> https://localhost:5000/ <-- this last '/' is the first argument to app.get()
This is a toy example so no customization is needed, but '/' can be changed to say, something like '/randomNumber'
This lets us name our API endpoints for their purposes. 

2nd argument: function()
If you notice, the second argument in the app.get() function is a function, just written in one of of the quicker
and fancier ways to write a function in Javascript. 
This function typically will have two arguments --> req, res (which is short for request, response)
The 'req' field allows us to take in the data for the request that was sent to our app.
The 'res' field allows us to send data back to the API caller. In our example, we just send a string that says, 'Hello World!'
*/
app.get('/', (req, res) => {
    console.log('Message Sent!')
    res.send('Hello World!')
})

/*
app.listen() uses 3 arguments here.

1st argument: port --> tell the application which port on the host server to listen on for requests/messages
2nd argument: host --> tells the application what URL/website is hosting the server. We could put something like
'google.com' there, but we're putting 'localhost' because that's the internal server that the computer itself hosts,
which is used very often to play around with your software before you deploy it to the cloud.
3rd argument: function --> in the example, this function takes in no arguments, it just logs a message to the terminal
to let us know that our server is running. It can do other things as well. 
*/
const port = 5000
const host = 'localhost'
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})

// let todos = [];

app.get('/todos', async (req, res) => {
    const todos = await getAllFromDatabase(req.query.username);
    res.json(todos);
})

app.post('/add-todo', async (req, res) => {
    const id = uuid();
    await insertIntoDatabase(req.body.username, id, req.body.task);

    const newTodo = {
        id: id,
        task: req.body.task,
        completed: false
    };
    res.json(newTodo);
});

app.delete('/delete-todo', async (req, res) => {
    await removeFromDatabase(req.body.id, req.body.username)
    res.status(200);
});

app.put('/check-todo', async (req, res) => {
    await toggleCompleteDatabase(req.body.id, req.body.username);
    res.status(200);
})

/*
To run -->  node index.js
node is the javascript runtime environment that runs our code in the file 'index.js'
*/