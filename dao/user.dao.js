const mongoose = require('mongoose')
const userSchema = require('../models/user.model')

userSchema.statics = {
    create: function (data, cb) {
        const user = new this(data)
        user.save(cb)
    }
}
mongoose.connection.close()
const userModel = mongoose.model('User', userSchema)
module.exports = userModel