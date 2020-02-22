exports.up = knex =>
  knex.schema.createTable("events", tbl => {
    tbl.increments("id");
    tbl
      .timestamp("created_at")
      .notNull()
      .defaultTo(knex.fn.now());
    tbl
      .integer("instance_id")
      .references("id")
      .inTable("instances");
    tbl.jsonb("payload");
    tbl.jsonb("request");
  });

exports.down = knex => knex.schema.dropTableIfExists("events");
