const User = require('./auth/controllers/user.controller')
const Message = require('./auth/controllers/message.controller')

module.exports = (router) => {
    router.post('/users', User.register)
    router.put('/users/:id', User.updateUser)
    router.delete('/users/:id', User.deleteUser)
    router.patch('/users/:id/active', User.activeUser)
    router.post('/users/:id', User.getUser)
    router.post('/authorization', User.getAuthorization)
    router.delete('/authorization', User.deleteAuthorization)
    router.post('/messages/send', Message.sendMessage)
}