// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

const fs = require('fs').promises;
const { Client, Pool }

class PGClient extends Client {

    async cleanQuery(query, values)

}










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