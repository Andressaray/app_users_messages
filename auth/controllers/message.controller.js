const { connection } = require('../../utilities/message')
const { preventUser }  = require('./user.controller')

exports.sendMessage = async (req, res) => {
    const { id } = req.body
    try {
        const user = await preventUser(id)
        if(user){
            connection(id)
            .then((data) => {
                console.log(`data`, data)
                res.json({
                    status: 200,
                    data: {message: data}
                })
                return
            })
            .catch((error) => {
                console.log(`error`, error)
                res.json({
                    status: 500,
                    message: error,
                    data: {}
                })
                return
            })
        }else{
            res.json({
                status: 500,
                data: {},
                message: 'You are not init session'
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: 'Internal server error'
        })
    }
}