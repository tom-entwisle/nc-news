exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable
      .increments("comment_id")
      .unique()
      .primary();
    commentsTable
      .string("author")
      .notNullable()
      .references("username");
    commentsTable
      .integer("article_id")
      .notNullable()
      .references("article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.date("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
