const express = require('express');
const path = require('path');
const mongo = require('mongodb-prebuilt');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();
let {MongodHelper} = mongo;

app.use('/static', express.static(__dirname + '/public'));
app.use('/', routes);

let mongodHelper = new MongodHelper(['--port', '27017']);
mongodHelper.run().then((started) => {
    console.log('mongod is running');
    var codenamesDB = 'mongodb://127.0.0.1/mongo_db';
    const mongooseOptions = {
      useNewUrlParser: true
    };
    mongoose.connect(codenamesDB, mongooseOptions);
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}, (exception) => {
    console.log('error starting', exception);
});

app.listen(4000);
console.log('Listening on port ' + 4000 + '...');
