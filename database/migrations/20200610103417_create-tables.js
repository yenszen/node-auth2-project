exports.up = function(knex) {
  return knex.schema
    .createTable("departments", tbl => {
      tbl.increments("id");
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
    })
    .createTable("users", tbl => {
      tbl.increments("id");
      tbl
        .string("name", 128)
        .notNullable()
        .unique()
        .index();
      tbl.string("password", 256).notNullable();
      tbl
        .integer("department")
        .unsigned()
        .notNullable()
        .references("departments.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("departments");
};
