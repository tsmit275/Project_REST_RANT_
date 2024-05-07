const express = require('express')
const router = express.Router()
const { Place, Comment } = require("../models")

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
        let updateData = {
            pic: req.body.pic || 'http://placekitten.com/400/400',
            city: req.body.city || 'Anytown',
            state: req.body.state || 'USA',
            founded: req.body.founded 
        }

        // Update the place
        await Place.findByIdAndUpdate(id, updateData, { runValidators: true })

        console.log('Place updated successfully:', updateData) 
        res.redirect(`/places/${id}`)
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.log(err.message)
            res.render('error404')
        } else {
            console.log(err)
            res.render('error404')
        }
    }
})

// Show route
router.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        const showPlace = await Place.findById(id)
        console.log('Place found:', showPlace) 
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
            state: req.body.state || 'USA',
            founded: req.body.founded 
        }

        await Place.create(newPlace)
        console.log('New place created:', newPlace) 
        res.redirect('/places')
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.log(err.message)
            res.render('error404')
        } else {
            console.log(err)
            res.render('error404')
        }
    }
})

// DELETE route
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        await Place.findByIdAndDelete(id)
        console.log('Place deleted successfully:', id) 
        res.redirect('/places')
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// PUT route for submitting comments
router.put('/:id/comments', async (req, res) => {
    let id = req.params.id
    try {
        const restaurant = await Place.findById(id)
        let comment = await Comment.create(req.body)
        
        restaurant.comments.push(comment.id)
        await restaurant.save()

        res.redirect(`/places/${id}`)
    } catch (e) {
        console.log(e)
        res.render('error404')
    }
})

module.exports = router
