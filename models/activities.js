const mongodb = require('../database/')

const getActivities = async () => {
    const collection = await mongodb.getDatabase().db().collection('activities')
    const results = await collection.find().toArray()
    return results
}
const getSingle = async (id) => {
    const collection = await mongodb.getDatabase().db().collection('activities')
    const results = await collection.find({ _id: id }).toArray()
    return results
}
const addActivity = async (body) => {
    const activity = {
        title: body.title,
        description: body.description,
        date: body.date,
        time: body.time,
        location: body.location,
        host: body.host,
        attendance: body.attendance
    }
    const collection = await mongodb.getDatabase().db().collection('activities')
    const results = await collection.insertOne(activity)
    if (!results.acknowledged) {
        throw new Error("There is an error when attemting adding a new acctivity")
    }
}
const updateActivity = async (id, body) => {
    const activity = {
        title: body.title,
        description: body.description,
        date: body.date,
        time: body.time,
        location: body.location,
        host: body.host,
        attendance: body.attendance
    }
    const collection = await mongodb.getDatabase().db().collection('activities')
    const result = await collection.replaceOne({ _id: id }, activity)
    if (result.modifiedCount === 0 || result.acknowledged === false) {
        throw new Error("An error happens when updating the activity")
    }
}
const deleteActivity = async (id) => {
    const collection = await mongodb.getDatabase().db().collection('activities')
    const result = await collection.deleteOne({ _id: id })
    if (result.deletedCount === 0 || result.acknowledged === false) {
        throw new Error("An error happens when deleting the activity")
    }
}
module.exports = { getActivities, getSingle, addActivity, updateActivity, deleteActivity }