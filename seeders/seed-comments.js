const express = require('express')
const router = express.Router()
const { Place } = require("../models")

// Index route
router.get("/", async (req, res) => {
    try {
        const allPlaces = await Place.find()
        res.render('places/index', { places: allPlaces })
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// New route
router.get("/new", (req, res) => {
    res.render("places/new")
})

// Edit route
router.get("/:id/edit", async (req, res) => {
    let id = req.params.id
    try {
        const showPlace = await Place.findById(id)
        res.render('places/edit', { place: showPlace })
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// PUT route for updating place
router.put('/:id', async (req, res) => {
    let id = req.params.id
    try {
        // Dig into req.body and make sure data is valid
        let updateData = {
            pic: req.body.pic || 'http://placekitten.com/400/400',
            city: req.body.city || 'Anytown',
            state: req.body.state || 'USA'
        }

        // Update the place
        await Place.findByIdAndUpdate(id, updateData, { runValidators: true })
        console.log('Place updated successfully:', updateData) // Log updated place
        res.redirect(`/places/${id}`)
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// Show route
router.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        const showPlace = await Place.findById(id)
        console.log('Place found:', showPlace) // Log found place
        res.render('places/show', { place: showPlace })
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// POST route for creating new place
router.post('/', async (req, res) => {
    try {
        let newPlace = {
            name: req.body.name,
            pic: req.body.pic || 'http://placekitten.com/400/400',
            cuisines: req.body.cuisines,
            city: req.body.city || 'Anytown',
            state: req.body.state || 'USA'
        }

        await Place.create(newPlace)
        console.log('New place created:', newPlace) // Log new place created
        res.redirect('/places')
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// DELETE route
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        await Place.findByIdAndDelete(id)
        console.log('Place deleted successfully:', id) // Log deleted place
        res.redirect('/places')
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

module.exports = router
