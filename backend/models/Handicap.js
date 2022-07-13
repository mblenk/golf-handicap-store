const mongoose = require('mongoose')


const handicapSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    differentials: {
        type: [Map]
    },
    current_handicap: {
        type: Number
    },
    handicap_history: {
        type: [Map]
    },
    last_twenty: {
        type: [Map]
    },
    counting: {
        type: [Map]
    },
})


const Handicap = mongoose.model('handicap', handicapSchema)

module.exports = Handicap