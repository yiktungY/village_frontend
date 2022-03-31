exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary();
      table.string("google_id").notNullable();
      table.string("avatar_url").notNullable();
      table.string("displayName").notNullable();
      table.string("givenName");
      table.string("familyName");
      table.string("address");
      table.string("introduction");
      table.string("selftag");
      table.integer("age");
      table.integer("rating");
      table.integer("doneCase").defaultTo(0);
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("posts", (table) => {
      table.uuid("id").primary();
      table.string("picture_Details");
      table.string("title", 75).notNullable();
      table.text("content").notNullable();
      table.string("status").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        //   .inTable("users")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts").dropTable("users");
};
