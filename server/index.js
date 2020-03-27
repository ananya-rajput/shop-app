require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const RestaurantRouter = require('./entities/restaurant')

const app = express()

// DB Connection
mongoose
   .connect(process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Connected to DB...'))
   .catch(e => console.log(e))

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
)
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/../client/build')))

const PORT = process.env.PORT || 4000

// Routes
app.use('/api/restaurants', RestaurantRouter)

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`)
})
