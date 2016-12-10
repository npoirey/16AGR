exports.up = function (knex, Promise) {
  return knex.raw(`
    CREATE TABLE public.events
    (
      id SERIAL PRIMARY KEY NOT NULL,
      date TIMESTAMPTZ NOT NULL,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      description TEXT,
      image_url TEXT
    );
    CREATE UNIQUE INDEX events_id_uindex ON public.events (id);
  `)
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('events')
};
