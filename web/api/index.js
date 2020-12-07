const express = require("express");

var router = express.Router();

/**
 * Base API class for the DuktAPI
 */
class DuktAPI {
    constructor(app) {
        this._router = router;
    }
}

module.exports = {
    DuktAPI
}