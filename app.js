const express = require('express');
const path = require('path');
const MongoInMemory = require('mongo-in-memory');

const routes = require('./routes/routes');

process.env.TITLE = 'Hello';
process.env.APP_ROOT = __dirname;

const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use('/', routes);

var mongoServerInstance = new MongoInMemory(27017);
mongoServerInstance.start((error, config) => {

    if (error) {
        console.error(error);
    }
});

app.listen(4000);
console.log('Listening on port ' + 4000 + '...');
