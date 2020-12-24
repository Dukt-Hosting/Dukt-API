// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

/**
 * Adds a GET route to the server
 * 
 * @param {import('express')()} app - The Express App to serve the file on
 * @param {string} filePath - The path of the file to be served
 * @param {string} route - The route to serve the file on
 */
serveFile = async (app, filePath, route) => {
    app.get(route, (req, res) => {
        res.sendFile()
    })
}

module.exports = {
    serveFile
}