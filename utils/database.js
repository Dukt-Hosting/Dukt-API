const fs = require('fs').promises;

/**
 * Applies a schema to the postgres database
 * 
 * @param {import('pg').Client} client - The Postgres client to apply the schema to
 * @param {string} schemaPath - The path to the schema file
 */
applySchema = async (client, schemaFile) => {
    let schema = await fs.readFile(schemaFile, 'utf8');
    return await client.query(schema);
}

module.exports = {
    applySchema
}