const { body } = require('express-validator')

const rules = () => {
    return [
        body('firstname')
            .trim()
            .notEmpty()
            .withMessage("Please give a name")
            .isAlpha()
            .escape(),
        body('lastname')
            .trim()
            .notEmpty()
            .withMessage("Please give a name")
            .isAlpha()
            .escape(),
        body('isMember')
            .trim()
            .notEmpty()
            .withMessage("Please type an option y or n")
            .isIn(['y', 'n'])
            .customSanitizer(value => value === 'y' ? true : false),
        body('stake')
            .trim()
            .default('none')
            .escape(),
        body('ward')
            .trim()
            .default('none')
            .escape()
    ]
}

module.exports = rules