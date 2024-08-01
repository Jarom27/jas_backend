const { param } = require('express-validator')
const router = require('express').Router()
const peopleController = require('../controllers/peopleController')
const peopleValidation = require('../middleware/peopleValidator')
const { ObjectId } = require('mongodb')
router.get('/', peopleController.getPeople)
router.get('/:id', peopleController.getSingle)
router.post('/', peopleValidation(), peopleController.addPerson)
router.put('/:id',
    param('id')
        .isMongoId()
        .bail()
        .customSanitizer(value => new ObjectId(value))
        .withMessage("Invalid id"),
    peopleValidation(),
    peopleController.updatePerson)
router.delete('/:id',
    param('id')
        .isMongoId()
        .bail()
        .customSanitizer(value => new ObjectId(value))
        .withMessage("Invalid id"),
    peopleController.deletePerson)
module.exports = router