// ==============================
//      Licensed Under GNUv3
//       Dukt Hosting 2020
// ==============================

const fetch = require('node-fetch')

/**
 * Sends a post request with a Json payload to a webhook
 */
const sendPost = async (json, url) => {
    let response;
    await fetch(url, {
        method:'post',
        body:JSON.stringify(json),
        headers: { 'Content-Type': 'application/json' }
    }).then(async (res) =>{
        response = await res.json();
    })

    return response;
}