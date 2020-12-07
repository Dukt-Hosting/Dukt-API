const { Client } = require('pg');

const config = require('./config/config.json');
const utils = require("./utils");
const web = require('./web');

const client = new Client(config.database);
const DuktServer = new web.DuktServer(config.webserver)

client.connect().then(async () => {
    await utils.database.applySchema(client, "./config/database_schema.pgsql");
    await client.end();
});

DuktServer.startServer();