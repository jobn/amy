# amy

poc sandbox for testing AMY tech stack

## /amy-knex

basic express server with knex for database abstraction

currently requires local postgres instance.
change adapter in `./knexfile.js' to sqlite3 to avoid this. example here: https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977

`knex migration:latest` to setup database

`knex seed:run` to populate with test data

`npm start` to start the server with nodemon

## /amy-feathers

feathers driven backend (not much to see here yet)

## /amy-frontend

xstate-driven frontend

bootstrapped using create-react-app so `yarn install && yarn start` should do the trick

