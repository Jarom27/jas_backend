const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let database

const initDb = (callback) => {
    if (database) {
        console.log("DB is already initialized")
        return callback(null, database)
    }
    MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.tpp9zek.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`)
        .then((client) => {
            database = client
            callback(null, database)
        })
        .catch((err) => {
            callback(err)
        })
}

const getDatabase = () => {
    if (!database) {
        throw Error("Database is uninitialized")
    }
    return database
}
module.exports = {
    initDb,
    getDatabase
}