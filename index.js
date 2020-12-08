const { Client } = require('pg');
const path = require('path')

const config = require('./config/config.json');
const utils = require("./utils");
const web = require('./web');

const client = new Client(config.database);
const DuktServer = new web.DuktServer(config)

client.connect().then(async () => {
    await utils.database.applySchema(client, "./config/database_schema.pgsql");
    await client.query(`INSERT INTO user_data`);
    await client.end();
});

DuktServer.startServer();