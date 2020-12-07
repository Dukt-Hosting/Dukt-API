const express = require("express");
const path = require("path")

const api = require("./api")
const errors = require("./errors")

checkConfig = (config) => {
    if (!config) {
        throw new errors.InvalidConfig("No Config Was Provided!");
    };
    if (!config.port) {
        throw new errors.InvalidConfig("Cant Find config.port");
    };
    if (!config.bindAddress) {
        throw new errors.InvalidConfig("Canf Find config.bindAddress");
    };

    return;
};

/**
 * Makes a new Express server for DuktServer (find a better name later :tm:)
 */
class DuktServer {
    constructor(config) {
        this._server = express();
        this._api = new api.DuktAPI()
        this._server.use("/api", this._api._router)
        checkConfig(config)
        this._config = config;
    }

    /**
     * Returns all routes in the DuktServer class
     */
    async getRoutes() {
        return this._server._router.stack
    }

    /**
     * Starts the express server with base routes
     */
    async startRouting() {
        this._server.get('/', async (req, res) => {
            res.sendFile(path.join(__dirname, '/views/index.html'))
        })

        this._server.listen(this._config.port, this._config.bindAddress)
    }
}

module.exports = {
    DuktServer
}