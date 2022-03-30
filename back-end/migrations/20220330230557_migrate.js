exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("google_id").notNullable();
      table.string("avatar_url").notNullable();
      table.string("displayName").notNullable();
      table.string("givenName");
      table.string("familyName");
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("posts", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("title", 75).notNullable();
      table.text("content").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("applyList", (table) => {
      table.increments("id").primary();
      table.integer("postId").notNullable();
      table.integer("userId").notNullable();
      table.string("content").notNullable();
      table.string("username").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      // table
      //   .foreign("post_id")
      //   .references("id")
      //   .inTable("posts")
      //   .onUpdate("CASCADE")
      //   .onDelete("CASCADE");
      // table
      //   .foreign("user_id")
      //   .references("id")
      //   .inTable("users")
      //   .onUpdate("CASCADE")
      //   .onDelete("CASCADE");
    });
};
exports.down = function (knex) {
  return knex.schema.dropTable("posts").dropTable("users");
};
