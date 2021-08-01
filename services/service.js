const jwt = require('jwt-simple')
const moment = require('moment')

const config = require('../config/token')

exports.createToken = (user) => {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add('14', 'days').unix()
    }
    const token = jwt.encode(payload, config.TOKEN)
    return token
}