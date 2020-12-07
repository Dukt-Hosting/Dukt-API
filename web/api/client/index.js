const express = require('express')

var router = express.Router();

class DuktClient {
    constructor(config) {
        this._config = config;
        this._router = router;
    }
}

module.exports = {
    DuktClient
}