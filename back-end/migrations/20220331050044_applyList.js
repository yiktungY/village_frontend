exports.up = function (knex) {
  return knex.schema.createTable("applyList", (table) => {
    table.uuid("id").primary();
    table.string("avatar_url").notNullable();
    table.string("content").notNullable();
    table.string("username").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      // .inTable("users")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("post_id").unsigned().notNullable();
    table
      .foreign("post_id")
      // .inTable("posts")
      .references("posts.d")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("applyList");
};
