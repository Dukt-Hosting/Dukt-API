const express = require("express");
const path = require("path")
const bodyParser = require('body-parser')

const api = require("./api")
const auth = require("./auth")
const errors = require("./errors")

checkConfig = (config) => {
    if (!config) {
        throw new errors.InvalidConfig("No Config Was Provided!");
    };
    if (!config.webserver.port) {
        throw new errors.InvalidConfig("Cant Find config.port");
    };
    if (!config.webserver.bindAddress) {
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
        this.DuktAPI = new api.DuktAPI(config)
        this.DuktAPI._startRouting()
        this.DuktAuth = new auth.DuktAuth(config)
        this.DuktAuth._startRouting()
        this._server.use("/api", this.DuktAPI._router)
        this._server.use("/auth", this.DuktAuth._router)
        this._server.use(bodyParser.json())
        checkConfig(config)
        this._webconfig = config.webserver;
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
    async startServer() {
        this._server.get('/', async (req, res) => {
            res.sendFile(path.join(__dirname, '/views/index.html'))
        })

        this._server.listen(this._webconfig.port, this._webconfig.bindAddress)
    }
}

module.exports = {
    DuktServer
}