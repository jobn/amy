exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("instances")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("instances").insert([
        { id: 1, name: "coop", token: "secret-token" },
        { id: 2, name: "matas", token: "other-secret-token" }
      ]);
    });
};
