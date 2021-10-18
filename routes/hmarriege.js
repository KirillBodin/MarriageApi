const {Router} = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = Router()

router.get('/', auth, async (req, res) => {
    res.render('profile', {
        title: 'Профиль',
        isProfile: true,
        user: req.user.toObject()
    })
})


router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange = {
            name: req.body.name
        }

        if (req.file) {
            toChange.hdocuments = req.file.path
        }

        Object.assign(user, toChange)
        await user.save()
        res.redirect('/marriage')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router