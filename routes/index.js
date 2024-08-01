const router = require('express').Router()

router.use('/', require('./swagger'))
router.get('', (req, res) => {
    // #swagger.ignore = true
    res.send({ message: "Hello world!" })
})
router.use('/people', require('./people'))
module.exports = router