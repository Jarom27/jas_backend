const { param } = require('express-validator')
const router = require('express').Router()
const activitiesController = require('../controllers/activitiesController')
const activityValidator = require('../middleware/activitiesValidator')
const { ObjectId } = require('mongodb')
const { getSingle } = require('../models/activities')

router.get('/', activitiesController.getActivities)
router.get('/:id',
    param('id')
        .isMongoId()
        .bail()
        .customSanitizer(value => new ObjectId(value))
        .withMessage("Invalid id"),
    activitiesController.getSingle)
router.post('/', activityValidator(), activitiesController.addActivity)
router.put('/:id',
    param('id')
        .isMongoId()
        .bail()
        .customSanitizer(value => new ObjectId(value))
        .withMessage("Invalid id")
        .custom(async value => {
            const result = await getSingle(value)
            if (result.length == 0) {
                throw Error("There is not activity with that id")
            }
        }),
    activityValidator(),
    activitiesController.updateActivity)
router.delete('/:id',
    param('id')
        .isMongoId()
        .bail()
        .customSanitizer(value => new ObjectId(value))
        .withMessage("Invalid id")
        .custom(async value => {
            const result = await getSingle(value)
            if (result.length == 0) {
                throw Error("There is not activity with that id")
            }
        }),
    activitiesController.deleteActivity
)

module.exports = router