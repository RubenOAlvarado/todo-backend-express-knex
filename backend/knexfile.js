import dotenv from 'dotenv';

dotenv.config();

// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: process.env.KNEX_MIGRATIONS_TABLE_NAME
  }
};
export const staging = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: process.env.KNEX_MIGRATIONS_TABLE_NAME
  },
  seeds: {
    directory: process.env.KNEX_SEEDS_DIRECTORY
  }
};
export const production = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: process.env.KNEX_MIGRATIONS_TABLE_NAME
  },
  seeds: {
    directory: process.env.KNEX_SEEDS_DIRECTORY
  }
};