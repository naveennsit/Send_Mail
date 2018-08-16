const mySqlConfig = require('./config').mysql;
const knex = require('knex')(mySqlConfig);


module.exports = {
    knex: knex
};