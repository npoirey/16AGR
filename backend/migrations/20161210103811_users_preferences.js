exports.up = function (knex, Promise) {
  return knex.raw(`
    CREATE TABLE public.users_preferences
    (
      user_id INT PRIMARY KEY NOT NULL,
      use_local_time BOOLEAN DEFAULT FALSE ,
      CONSTRAINT users_preferences_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
    );
    CREATE UNIQUE INDEX users_preferences_user_id_uindex ON public.users_preferences (user_id);
  `)

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users_preferences')
};
