const { ObjectId } = require('mongodb')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if(err.message === 'Incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if(err.message === 'Incorrect password') {
        errors.password = 'Password is incorrect';
    }
  
    // duplicate email error
    if(err.code === 11000) {
      errors.email = 'That email is already registered';
      return errors;
    }
  
    // validation errors
    if(err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    return errors;
  }

const maxAge = 1 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}


module.exports.login_user = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user })
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}    


module.exports.create_user = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({ display_name: name, email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user })
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.check_user = async (req, res) => {
    const { id } = res.locals.token

    if(ObjectId.isValid(id)) {
        try {
            const data = await User.findOne({ _id: ObjectId(id) })
            res.status(200).json(data)
        }
        catch(err) {
            console.log(err)
            res.status(400).send('No auth token found')
        }
    } else {
        res.status(200).json(null)
    }
}

module.exports.log_out = (req, res) => {
    console.log('fired logout')
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 })
    res.status(200).json({ mssg: 'User logged out'})
}

// module.exports.delete_user = async (req, res) => {
//     if(ObjectId.isValid(req.params.id)){
//         try {
//             const user = await User.findOne({ _id: ObjectId(req.params.id) })
//             res.status(200).json(user)
//         }
//         catch(err) {
//             console.log(err)
//             res.status(400).send('error, not found')
//         }
//     } else {
//         res.status(500).json({ error: 'Not a valid document ID'})
//     }
// }

// module.exports.update_user = async (req, res) => {
//     const updates = req.body

//     if(ObjectId.isValid(req.params.id)){
//         try {
//             const user = await User.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
//             res.status(200).json(user)
//         }
//         catch(err) {
//             console.log(err)
//             res.status(400).send('error, not found')
//         }
//     } else {
//         res.status(500).json({ error: 'Not a valid document ID'})
//     }
// }