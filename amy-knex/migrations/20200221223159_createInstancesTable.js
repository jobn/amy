exports.up = knex =>
  knex.schema.createTable("instances", tbl => {
    tbl.increments("id");
    tbl.string("name").notNullable();
    tbl.string("token").notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists("instances");
