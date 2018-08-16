const knex = require('../utitlity/db').knex;
const PLAYER_TABLE_NAME = require('../utitlity/config').PLAYER_TABLE_NAME;

async function getTableData() {
    const output = await knex.select('*').from(PLAYER_TABLE_NAME)
    console.log(output);
    return output;
}

async function savePlayerData(req, res) {
    console.log(req.body)
    try {
        const output = await knex(PLAYER_TABLE_NAME).insert(req.body).returning('*')
            .into(PLAYER_TABLE_NAME);
        console.log(output);
        const data = await knex.select('*').from(PLAYER_TABLE_NAME)
            .where('id', output)
        //  res.send(rows)
        res.status(201).send({
            status: 200,
            message: "successfully inserted",
            data: data
        });
    } catch (e) {
        console.log('error');
        console.log(e)
    }
}

async function getAllPlayersData(req, res) {
    try {
        const output = await knex.select('*').from(PLAYER_TABLE_NAME)
        console.log(output);
        //  res.send(rows)
        res.status(201).send({
            status: 200,
            message: "successfully inserted",
            data: output
        });
    } catch (e) {
        console.log('error');
        console.log(e)
    }
}

async function deletePlayerData(req, res) {
    try {
        console.log('deleted item', req.body.id)
        await knex(PLAYER_TABLE_NAME)
            .where('id', req.body.id)
            .del()
        var newData = await getTableData();
        res.status(200).send({
            status: 200,
            message: "successfully deleted",
            data: newData
        });

    } catch (e) {
        console.log('error');
        console.log(e)
    }
}

module.exports = {
    savePlayerData: savePlayerData,
    getAllPlayersData: getAllPlayersData,
    deletePlayerData: deletePlayerData

}