const express = require('express')
require('dotenv').config()

const users = require('./routes/Users')
const app = express()
const router = express.Router()
const port = process.env.PORT


app.use('/api/v1/', users)

app.use('/', (req,res) => {
    res.send("Hello World")
})

app.listen(port, () => console.log(`App Started at ${port}`))