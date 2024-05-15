// Modules and Globals
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose')


// Express Settings
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

// Controllers & Routes
app.use('/places', require('./Controllers/places'))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error404')
})

// Listen for Connections
const start = async () => {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to database')
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    })
  }
  
  start()
