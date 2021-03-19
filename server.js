require('dotenv').config()

const express = require('express')
const app = express()
var cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

app.use(cors())
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connection to db established'))
app.use(express.json())

const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)


app.listen(process.env.PORT, () =>
  console.log(`server has started at port ${process.env.PORT}`)
)
