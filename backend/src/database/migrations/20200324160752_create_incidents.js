
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments();//cria a chave primária automaticamente, 1,2,3...
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //relacionamento com a outra tabela
        table.string('ong_id').notNullable();
        //foreign key:
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
