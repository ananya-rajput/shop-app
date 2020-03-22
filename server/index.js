require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// Local imports
const config = require('./config')
const UserRouter = require('./routes/user.router')

// DB Connection
mongoose
   .connect(config.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Connected to DB...'))
   .catch(e => console.log(e))

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/users', UserRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`)
})
