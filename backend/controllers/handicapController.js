const { ObjectId } = require('mongodb')
const Handicap = require('../models/Handicap')
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports.get_user_data = async (req, res) => {
    if(req.params.id){
        try {
            const data = await Handicap.findOne({ user_id: req.params.id })
            res.status(200).json(data)
        }
        catch(err) {
            console.log(err)
            res.status(400).send('error, not found')
        }
    } else {
        res.status(500).json({ error: 'Not a valid document ID'})
    }
}

module.exports.update_user_data = async (req, res) => {
    if(req.params.id){
        try {
            const data = await Handicap.updateOne({ user_id: req.params.id }, req.body)
            res.status(200).json(data)
        }
        catch(err) {
            console.log(err)
            res.status(400).send('Error, could not update')
        }
    } else {
        res.status(500).json({ error: 'Not a valid document ID'})
    }
}

module.exports.create_data = async (req, res) => {
    const { user_id } = req.body
    try {
        const data = await Handicap.create({ 
            user_id,
            current_handicap: 54,
            differentials: [],
            nine_history: [],
            handicap_history: [],
            last_twenty: [],
            counting: [],
        })
        res.status(201).json({ data: data.user_id })
    }
    catch(err) {
        console.log(err)
    }
}
