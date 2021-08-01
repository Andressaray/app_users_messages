const User = require('../../dao/user.dao')
const { createToken } = require('../../services/service')

exports.register = async (req, res) => {
    if(!req.body){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
        return
    }
    let newUser = {
        id: req.body.id,
        name: req.body.name,
        active: false
    }
    try {
        const isUser = await this.preventUser(newUser.id)
        if(isUser){
            res.json({
                status: 409,
                message: 'User exists'
            })
            return
        }
        newUser.token = createToken(newUser) 
        await User.create(newUser)
        res.json({
            status: 200,
            message: 'User created successfully'
        })
        return
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }

}

exports.updateUser = async (req, res) => {
    if(!req.params || !req.body){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
    }
    const user = {
        id: parseInt(req.body.id),
        name: req.body.name
    }
    try {
        const isUser = await this.preventUser(user.id)
        if(isUser){
            await User.findOneAndUpdate({ id: user.id }, 
                    {$set: { name: user.name }}, {new: true}, 
                async (err, newUser) => {
                    if(err){
                        throw err
                    }else{
                        await res.json({
                            status: 200,
                            data: newUser.name
                        })
                    }
            })
            return
        }else{
            res.json({
                status: 404,
                message: 'Este usuario no existe',
                data: {}
            })
            return
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    if(!req.params){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
        return
    }
    const { id } = req.body
    try {
        const isUser = await this.preventUser(id)
        if(isUser){
            await User.findOneAndRemove({ id })
            res.json({
                status: 200,
                message: 'Usuario eliminado',
                data: {}
            })
            return
        }else{
            res.json({
                status: 404,
                message: 'Este usuario no existe',
                data: {}
            })
            return
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }
}

exports.activeUser = async (req, res) => {
    if(!req.params){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
        return
    }
    const { id } = req.body
    try {
        const isUser = await this.preventUser(id)
        if(isUser) {
            await User.findOneAndUpdate({ id }, {$set: { active: true }}, {new: true}, async (err, user) => {
                if(err){
                    throw err
                }else{
                    res.json({
                        status: 200,
                        message: 'User actived successfully',
                        data: user.active
                    })
                }
            })
            return
        }else{
            res.json({
                status: 404,
                message: 'Este usuario no existe',
                data: {}
            })
            return
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }
}

exports.getUser = async (req, res) => {
    if(!req.params){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
        return
    }
    const { id } = req.body
    try {
        const user = await this.preventUser(id)
        if(user?.token){
            res.json({
                status: 200,
                active: user.active
            })
            return
        }else{
            res.json({
                status: 409,
                message: 'You are no autorizade',
                data: {}
            })
            return
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }

}

exports.getAuthorization = async (req, res) => {
    if(!req.params){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
        return
    }
    const { id } = req.body
    try {
        const user = await this.preventUser(id)
        if(user?.token){
            res.json({
                status: 409,
                data: {},
                message: 'This id have to token registred'
            })
            return
        }else if(user){
            const token = createToken(id)
            await User.findOneAndUpdate({ id }, { token })
            res.json({
                status: 200,
                data: {token}                
            })
            return        
        }else{
            res.json({
                status: 409,
                data: {},
                message: 'User no found'
            })
            return 
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }
}

exports.deleteAuthorization = async (req, res) => {
    if(!req.params){
        res.json({
            status: 404,
            message: 'No data',
            data: {}
        })
        return
    }
    const { id } = req.body
    try {
        const user = await this.preventUser(id)
        if(user.token){
            await User.findOneAndUpdate({ id }, { token: '' })
            res.json({
                status: 200,
                data: {},
                message: 'Token deleted'
            })
            return       
        }else{
            res.json({
                status: 409,
                data: {},
                message: 'User no found'
            })
            return 
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }

}

exports.preventUser = async (id) => {
    const user = await User.findOne({ id })
    return user
}