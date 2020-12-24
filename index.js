// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

const { Client } = require('pg');
const rfr = require('rfr')
const path = require('path')

const config = require('./config/config.json');
const utils = require("./utils");
const web = require('./web');
const ConfigHelper = rfr('utils/helpers/config.js');

const Config = new ConfigHelper();
const client = new Client(config.database);
const DuktServer = new web.DuktServer(config)

client.connect().then(async () => {
    await utils.database.applySchema(client, "./config/database_schema.pgsql");
    let res = await client.query('SELECT * FROM login_data')
    console.log(res)
    await client.end();
});

DuktServer.startServer();