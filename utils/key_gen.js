const hat = require('hat')

/**
 * Gens a API key then returns it
 */
exports.genKey = async () => {
    return hat()
}