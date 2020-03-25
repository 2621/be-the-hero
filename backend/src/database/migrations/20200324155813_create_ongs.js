
exports.up = function(knex) {
  //create table
  return knex.schema.createTable('ongs',function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf',2).notNullable();
  })
};

exports.down = function(knex) {
    //delete table
    return knex.schema.dropTable('ongs');
  
};


//npx knex migrate -> vai mostrar todas as opções, tem uma q desfaz a última migration