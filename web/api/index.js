// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

const express = require("express");
const bodyParser = require('body-parser')

const client = require('./client')
const admin = require('./admin')
const auth = require('./auth')

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
        this.DuktAuth = new auth.DuktAuth(config);
        this.DuktAdmin.startRouting();
        this.DuktClient.startRouting();
        this.DuktAuth.startRouting();
        this._router.use("/admin", this.DuktAdmin._router);
        this._router.use("/client", this.DuktClient._router);
        this._router.use("/auth", this.DuktAuth._router);
        this._router.use(bodyParser.json());
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