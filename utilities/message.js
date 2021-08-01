const mqtt = require('mqtt')
const { getMessage } = require('./getMessage')

exports.connection = (id) => {
    return new Promise((resolve, reject) => {
        getMessage()
            .then((data) => {
                const message = data.fact
                const client = mqtt.connect('http://mqtt.lyaelectronic.com:4010')
                client.on('connect', () => {
                    client.subscribe('topic1/', () => {
                        client.on('message', () => {
                            
                        })
                    })
                    client.publish(message, id, function() {
                        client.end()
                        resolve('Message is published')
                    })
                })
            })    
            .catch(() => {
                client.on('error', (error) => {
                    reject(error)
                })
            })
    })
}