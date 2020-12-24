// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')

var router = express.Router();

/**
 * DuktAuth Object
 * @param {config} Config
 */
class DuktAuth {
    constructor(config) {
        this._config = config;
        this._router = router;
        this._router.use(bodyParser.json())
    }

    async startRouting() {
        this._router.get('/', async (req, res) => {
            res.send("AUTH ENDPOINT")
        })

        this._router.post('/login', async (req, res) => {
            console.log(req.headers)
            let qres;
            const client = new Client(this._config.database)
            let authdata = req.headers.authorization.split(':')
            await client.connect().then(async () => {
                qres = await client.query("SELECT * FROM login_data WHERE username = $1", [authdata[0]])
                await client.end()
            })
            if (qres.rows.length === 0){
                return res.send('User not found').sendStatus(403)
            };
            if (authdata[1] !== qres.rows[0].password_hash) {
                return res.send('User not found').sendStatus(403)
            }
            if (authdata[1] === qres.rows[0].password_hash) {
                return res.send('Access granted!').sendStatus(200)
            }
        })
    }
}

module.exports = {
    DuktAuth
}