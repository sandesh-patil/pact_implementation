const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());
const port = 9123;

const dataStore = {
    names: [],
};

server.get('/names', (request, response) => {
    response.status(200);
    response.json(dataStore.names);
});

server.post('/names', (request, response) => {
    const newName = request.body;
    newName.id = dataStore.names.length;
    dataStore.names.push(newName);
    response.status(200);
    response.json(newName);
});

server.delete('/names/:id', (request, response) => {
    const foundName = dataStore.names.find(name => name.id === parseInt(request.params.id));
    dataStore.names = dataStore.names.filter(name => name !== foundName);
    response.status(200);
    response.json(foundName);
});

module.exports = {
    server,
    dataStore,
}
