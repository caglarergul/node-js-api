/**
 * Created by caglarergul on 11.06.2018.
 */

// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    // Make sure you add the database name and not the collection name
    dba = database.db("suitsupplydb")
    require('./app/routes')(app, dba);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})