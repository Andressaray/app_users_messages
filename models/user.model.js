const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userSchema = new Schema ({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    active: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
    }
})
module.exports = userSchema