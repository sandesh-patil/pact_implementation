const request = require('superagent');

const API_ENDPOINT = 'http://localhost:9123';

const getNames = () => {
    return request
        .get(`${API_ENDPOINT}/names`)
        .then(response => {
            return response.body;
        });
};

const createName = (name) => {
    return request
        .post(`${API_ENDPOINT}/names`)
        .type('json')
        .send(name)
        .then(response => {
            return response.body;
        });
};

const deleteName = (nameId) => {
    return request
        .delete(`${API_ENDPOINT}/names/${nameId}`)
        .then(response => {
            return response.body;
        });
};

module.exports = {
    getNames,
    createName,
    deleteName,
};