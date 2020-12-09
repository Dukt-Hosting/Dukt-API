const express = require("express");
const path = require("path")
const bodyParser = require('body-parser')

const api = require("./api")
const errors = require("./errors.js")

checkConfig = (config) => {
    if (!config) {
        throw new errors.ConfigError("No config provided");
    };
    if (!config.webserver.port) {
        throw new errors.ConfigError("Cant Find config.port");
    };
    if (!config.webserver.bindAddress) {
        throw new errors.ConfigError("Canf Find config.bindAddress");
    };

    return;
};

/**
 * Makes a new Express server for DuktServer (find a better name later :tm:)
 * 
 * @param {object} config - Configuration object
 * @param {string} config.webserver - The public name for the server to show
 */
class DuktServer {
    constructor(config) {
        this._server = express();
        this.DuktAPI = new api.DuktAPI(config)
        this.DuktAPI._startRouting()
        this._server.use(bodyParser.json())
        this._server.use("/api", this.DuktAPI._router)
        checkConfig(config)
        this._webconfig = config.webserver;
        this._config = config;
    }

    /**
     * Returns all routes in the DuktServer class
     */
    async getRoutes() { //! doesn't need to be async
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