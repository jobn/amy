exports.up = knex =>
  knex.schema.alterTable("events", tbl => {
    tbl.index("instance_id");
  });

exports.down = knex =>
  knex.schema.alterTable("events", tbl => {
    tbl.dropIndex("instance_id");
  });
