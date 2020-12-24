// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

const express = require('express')
const bodyParser = require('body-parser')

var router = express.Router();

class DuktClient {
    constructor(config) {
        this._config = config;
        this._router = router;
        this._router.use(bodyParser.json())
    }

    async startRouting() {
        this._router.get('/', async (req, res) => {
            
        })
    }
}

module.exports = {
    DuktClient
}