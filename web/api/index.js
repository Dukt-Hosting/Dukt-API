const express = require("express");
const bodyParser = require('body-parser')

const client = require('./client')
const admin = require('./admin')

var router = express.Router();

/**
 * Base API class for the DuktAPI
 */
class DuktAPI {
    constructor(config) {
        this._router = router;
        this._config = config;
        this.DuktAdmin = new admin.DuktAdmin(config);
        this.DuktClient = new client.DuktClient(config);
        this.DuktAdmin._startRouting()
        this.DuktClient._startRouting()
        this._router.use("/admin", this.DuktAdmin._router);
        this._router.use("/admin", this.DuktClient._router);
        this._router.use(bodyParser.json())
    }

    async _startRouting() {
        this._router.get('/', async (req, res) => {
            res.send("API ENDPOINT")
        })
    }
}

module.exports = {
    DuktAPI
}