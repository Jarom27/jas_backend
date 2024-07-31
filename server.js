const express = require('express')
const cors = require('cors')
const mongo = require('./database/')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-key"
    )
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
app.use(cors({ origin: "*" }))

app.use("/", require("./routes/index.js"))

mongo.initDb((err) => {
    if (err) {
        console.error(err)
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and running on port ${port}`)
        })
    }
})