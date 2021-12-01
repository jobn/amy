exports.up = knex =>
  knex.schema.alterTable("instances", tbl => {
    tbl.unique("token");
  });

exports.down = knex =>
  knex.schema.alterTable("instances", tbl => {
    tbl.dropIndex("token");
  });
