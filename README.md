# todo-backend-express-knex
This is an implementation of Todo-Backend using Node and Express for the server, Knex for database migrations and query building, and some ES6+ features such as async/await. By default, this project configures Knex to save to PostgreSQL.

It has a small frontend created with Vite and React, with a simple UI to interact with the API.

## Running the project
1. Clone the repository
2. Install dependencies with `npm install`
3. Run the migrations with `npm run migrate`
4. Run the seeds with `npm run seed`
5. Start the server with `npm start` it runs both backend and frontend concurrently

## Set up the database
By default, this project is configured to use PostgreSQL. You can change the database configuration in the `knexfile.js` file. You can also use SQLite, MySQL, or other databases supported by Knex.
To work with the current implementation run the docker-compose file in the root of the project with the following command:

``` bash
docker-compose up -d
```
And then edit the .env file in the backend folder to match the database configuration using the following values:

``` bash
DB_CLIENT=
PG_DATABASE=
PG_USER=
PG_PASSWORD=
KNEX_MIGRATIONS_TABLE_NAME=
KNEX_SEEDS_DIRECTORY=
```