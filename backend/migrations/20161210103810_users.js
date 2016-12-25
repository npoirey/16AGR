exports.up = function (knex, Promise) {
  return knex.raw(`
    CREATE TABLE public.users
    (
      id SERIAL PRIMARY KEY NOT NULL,
      callsign TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      admin BOOLEAN NOT NULL DEFAULT false
    );
    CREATE UNIQUE INDEX users_id_uindex ON public.users (id);
    CREATE UNIQUE INDEX users_callsign_uindex ON public.users (callsign);
  `)
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};
