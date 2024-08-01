const peopleModel = require('../models/people')
const getPeople = async (req, res) => {
    // #swagger.tags = ['people']

    try {
        const results = await peopleModel.getPeople()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ errors: "There is an internal error" })
        console.error("There is an error in " + error.message)
    }
}
const getSingle = async (req, res) => {
    // #swagger.tags = ['people']
    try {
        const result = await peopleModel.getSingle(req.params.id)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(result)
    } catch (error) {
        if (error.message === "Invalid id, please gives a correct id") {
            res.status(422).json({ errors: error.message })
        }
        else {
            res.status(500).json({ errors: error.message })
        }
        console.error(error)
    }
}
const addPerson = async (req, res) => {
    // #swagger.tags = ['people']
    /* #swagger.parameters['body] = {
        in: 'body',
        description: 'Add new person.',
        schema: { $ref: '#/definitions/addPerson' }
    
    }*/
    try {
        console.log(req.body)
        await peopleModel.addPerson(req.body)
        res.setHeader("Content-Type", "application/json")
        res.status(201).json({ message: "The person has been created" })
    } catch (error) {
        res.status(422).json({ errors: error.message })
        console.error(error)
    }
}
const updatePerson = async (req, res) => {
    // #swagger.tags = ['people']
    /* #swagger.parameters['body] = {
        in: 'body',
        description: 'Update a person.',
        schema: { $ref: '#/definitions/addPerson' }
    
    }*/
    try {
        await peopleModel.updatePerson(req.body, req.params.id)
        res.setHeader("Content-Type", "application/json")
        res.status(203).json({ message: "The person has been updated" })

    } catch (error) {
        res.status(422).json({ errors: error.message })
        console.error(error.message)
    }

}
const deletePerson = async (req, res) => {
    // #swagger.tags = ['people']
    try {
        await peopleModel.deletePerson(req.params.id)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({ message: "The person has been deleted" })
    } catch (error) {
        res.status(422).json({ errors: error.message })
        console.error(error)
    }
}
module.exports = { getPeople, getSingle, addPerson, updatePerson, deletePerson }