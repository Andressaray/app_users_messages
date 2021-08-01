const fetch = require('node-fetch')

exports.getMessage = async () => {
    const url = `https://catfact.ninja/fact?max_length=150`
    const data = await fetch(url, {
        method: 'GET',
        cors: 'no-cors'
    })
    const messages = await data.json()
    return messages
}