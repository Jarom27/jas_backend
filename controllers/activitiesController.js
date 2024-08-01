const activitiesModel = require('../models/activities')
const { validationResult } = require('express-validator')

const getActivities = async (req, res) => {
    // #swagger.tags = ['activities']
    try {
        const results = await activitiesModel.getActivities()
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ errors: error.message })
        console.error(error)
    }
}
const getSingle = async (req, res) => {
    // #swagger.tags = ['activities']
    try {
        validationResult(req).throw()
        const results = await activitiesModel.getSingle(req.params.id)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(results)
    } catch (error) {
        if (error.mapped) {
            res.status(422).json({ errors: error.mapped() })
        }
        else {
            res.status(500).json({ errors: error.message })
        }
        console.error(error)
    }
}
const addActivity = async (req, res) => {
    // #swagger.tags = ['activities']
    /* #swagger.parameters['body] = {
        in: 'body',
        description: 'Add new Activity.',
        schema: { $ref: '#/definitions/addActivity' }
    
    }*/
    try {
        validationResult(req).throw()
        await activitiesModel.addActivity(req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: "The activity has been created" })
    } catch (error) {
        if (error.mapped) {
            res.status(422).json({ errors: error.mapped() })
        }
        else {
            res.status(500).json({ errors: error.message })
        }
        console.error(error)
    }
}

const updateActivity = async (req, res) => {
    // #swagger.tags = ['activities']
    /* #swagger.parameters['body] = {
        in: 'body',
        description: 'Update an Activity.',
        schema: { $ref: '#/definitions/addActivity' }
    
    }*/
    try {
        validationResult(req).throw()
        await activitiesModel.updateActivity(req.params.id, req.body)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: "The activity has been updated" })
    } catch (error) {
        if (error.mapped) {
            res.status(422).json({ errors: error.mapped() })
        }
        else {
            res.status(500).json({ errors: error.message })
        }
        console.error(error)
    }
}
const deleteActivity = async (req, res) => {
    // #swagger.tags = ['activities']
    try {
        validationResult(req).throw()
        await activitiesModel.deleteActivity(req.params.id)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: "The activity has been deleted" })
    } catch (error) {
        if (error.mapped) {
            res.status(422).json({ errors: error.mapped() })
        }
        else {
            res.status(500).json({ errors: error.message })
        }
        console.error(error)
    }
}
module.exports = { getActivities, getSingle, addActivity, updateActivity, deleteActivity }