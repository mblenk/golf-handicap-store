const express = require('express')
const { auth } = require('../middleware/authMiddleware')
const handicapController = require('../controllers/handicapController')

const router = express.Router()

router.get('/:id', auth, handicapController.get_user_data)
router.post('/create', auth ,handicapController.create_data)
router.patch('/update/:id', auth, handicapController.update_user_data)

router.delete('/', () => {})

module.exports = router