exports.up = knex =>
  knex.schema.alterTable("events", tbl => {
    tbl.string("name");
  });

exports.down = knex =>
  knex.schema.alterTable("events", tbl => {
    tbl.dropColumn("name");
  });
