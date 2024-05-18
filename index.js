// index.js

// Modules and Globals
require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const methodOverride = require('method-override');

const app = express();

// Express Settings
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Controllers and Routes
app.use("/places", require("./controllers/places"));

app.get("/", (req, res) => {
    res.render("home");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get("*", (req, res) => {
    res.render('error404');
});

// Connect to MongoDB
mongoose.connect(process.env.PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Express server listening on port", PORT, "in", app.settings.env, "mode");
});

console.log("load index.js");