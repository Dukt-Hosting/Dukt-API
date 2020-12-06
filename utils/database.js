const fs = require('fs').promises;

/**
 * Applies a schema or some shit idfk
 * 
 * @param {import('pg').Client} client - The Postgres client to cum inside
 * @param {string} schemaPath - The path to the schema file
 */
applySchema = async (client, schemaFile) => {
    let schema = await fs.readFile(schemaFile, 'utf8');
    return await client.query(schema);
}

module.exports = {
    applySchema
}