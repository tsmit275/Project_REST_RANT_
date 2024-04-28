const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb+srv://taylorlsmith03:DdgtpZELPz0Hifsa@rest-rant.wpcwr7p.mongodb.net/?retryWrites=true&w=majority&appName=Rest-Rant';
const dbName = 'Rest-Rant';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db(dbName);

        // Your database operations go here

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to the database');
        console.error(error);
    });


