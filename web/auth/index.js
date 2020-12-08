const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')

var router = express.Router();

class DuktAuth {
    constructor(config) {
        this._config = config;
        this._router = router;
        this._router.use(bodyParser.json())
    }

    async _startRouting() {
        this._router.get('/', async (req, res) => {
            res.send("AUTH ENDPOINT")
        })

        this._router.post('/login', async (req, res) => {
            let headers = req.headers
            let body = req.body.json()
            const client = new Client(this._config.database)
            client.connect().then(async () => {
                
            })
        })
    }
}

module.exports = {
    DuktAuth
}