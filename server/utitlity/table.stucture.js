module.exports = function (knex) {
    (async function () {
        const exit = await knex.schema.withSchema('sql12252060').hasTable('player');
        console.log('KNEX', exit);
        if (!exit) {
            const output = await knex.schema.withSchema('sql12252060').createTable('player', (table) => {
                table.increments('id');
                table.string('firstname').notNullable();
                table.string('lastname');
            })
            console.log(output)
        }

    })();
}


