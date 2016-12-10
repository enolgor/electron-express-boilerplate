'use static'

const express = require('express');

const backend = () => {

    const app = express();

    //0 is next free port
    const server = app.listen(0, () => {});

    app.set('port', server.address().port);

    app.use(express.static(__dirname + '/static'));

    return server.address().port;
};

module.exports = backend;