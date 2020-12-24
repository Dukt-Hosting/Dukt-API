// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

class ConfigError extends Error {
    constructor(...args){
        super(...args);
        this.name = "ConfigError"
    }
}

module.exports = {
    ConfigError
}