const mongodb = require("../database/")
const { ObjectId } = require('mongodb')
const getPeople = async () => {
    const collection = await mongodb.getDatabase().db().collection("people")
    const results = await collection.find().toArray()
    return results
}

const getSingle = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid id, please gives a correct id")
    }
    const personId = new ObjectId(id)
    const collection = await mongodb.getDatabase().db().collection("people")
    const results = await collection.find({ _id: personId }).toArray()
    return results
}
const addPerson = async (body) => {
    let isMember = body.isMember === "y" ? true : false
    const person = {
        firstname: body.firstname,
        lastname: body.lastname,
        isMember: isMember,
        stake: !isMember ? 'none' : body.stake,
        ward: !isMember ? 'none' : body.ward
    }

    const collection = await mongodb.getDatabase().db().collection("people")
    const result = await collection.insertOne(person)
    if (!result.acknowledged) {
        throw new Error("An error happens when inserting a new person")
    }

}
const updatePerson = async (body, id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid id, please give a correct a ID")
    }
    let isMember = body.isMember === "y" ? true : false
    const person = {
        firstname: body.firstname,
        lastname: body.lastname,
        isMember: isMember,
        stake: !isMember ? 'none' : body.stake,
        ward: !isMember ? 'none' : body.ward
    }
    const collection = await mongodb.getDatabase().db().collection("people")
    const result = await collection.replaceOne({ _id: new ObjectId(id) }, person)
    if (result.modifiedCount === 0 || result.acknowledged === false) {
        throw new Error("An error happens when inserting a new person")
    }
}
const deletePerson = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid id, please give a correct id")
    }
    const collection = await mongodb.getDatabase().db().collection("people")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0 || result.acknowledged === false) {
        throw new Error("An error happens when deleting a new person")
    }
}
module.exports = { getPeople, getSingle, addPerson, updatePerson, deletePerson }