const { body } = require('express-validator')
const { ObjectId } = require('mongodb')
const { getSingle } = require('../models/people')

const rules = () => {
    return [
        body('title')
            .trim()
            .notEmpty()
            .escape(),
        body('description')
            .trim()
            .default('')
            .escape(),
        body('date')
            .trim()
            .notEmpty()
            .isDate({ format: 'DD/MM/YYYY' }),
        body('time')
            .trim()
            .notEmpty()
            .isTime({ hourFormat: 'hour12' }),
        body('location')
            .trim()
            .notEmpty()
            .escape(),
        body('host')
            .trim()
            .default('')
            .escape(),
        body('attendance')
            .default([])
            .isArray(),
        body('attendance.*.person_id')
            .if(body('attendance').isLength({ min: 1 }))
            .isMongoId()
            .bail()
            .customSanitizer(value => new ObjectId(value))
            .custom(async value => {
                const results = await getSingle(value)
                if (results.length == 0) {
                    throw new Error("The person doesn't exist")
                }
            })
    ]
}

module.exports = rules