var express = require('express'),
    app = express(),
    chalk = require('chalk'),
    debug = require('debug')('app'),
    morgan = require('morgan'),
    path = require('path'),
    knex = require('./utitlity/db.js').knex,
    cors = require('cors'),
    bodyParser = require('body-parser'),
    controller = require('./controllers/player.controller'),
    PORT = process.env.PORT || 3000;
require('./utitlity/table.stucture')(knex);


app.use(morgan('tiny'));
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json());

const bookRoutes = require('./routes/bookroutes');

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

app.use('/book', bookRoutes);


app.get('/api', controller.getAllPlayersData);

app.post('/api', controller.savePlayerData);
app.delete('/delete',controller.deletePlayerData);
app.put('/api',controller.updatePlayerData);


app.listen(PORT, () => {
    debug(`listing to ${chalk.red(PORT)}`);

});