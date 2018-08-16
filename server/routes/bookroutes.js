var express = require('express');
var bookRoutes = express.Router();

bookRoutes.get('/', (req, res) => {
    console.log('book')
    res.send('book')
});

module.exports = bookRoutes;