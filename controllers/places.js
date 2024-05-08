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
    try {
        const id = req.params.id
        const showPlace = await Place.findById(id)
        res.render('places/edit', { id: id, place: showPlace })
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// PUT route for updating place
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
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
        console.log(err)
        res.render('error404')
    }
})

// Show route
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const showPlace = await Place.findById(id).populate('comments')
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

        await Place.create(newPlace);
        console.log('New place created:', newPlace)
        res.redirect('/places')
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Place.findByIdAndDelete(id)
        console.log('Place deleted successfully:', id)
        res.redirect('/places')
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// POST route for submitting comments
router.post('/:id/comment', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id)
        if (!place) {
            return res.render('error404')
        }
        
        const comment = new Comment({
            author: req.body.author,
            content: req.body.content,
            stars: parseFloat(req.body.stars),
            rant: req.body.rant === 'on'
        })

        await comment.save()
        place.comments.push(comment)
        await place.save()

        res.redirect(`/places/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

// DELETE route for deleting comments
router.delete('/:id/comment/:commentId', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId)
        res.redirect(`/places/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.render('error404')
    }
})

module.exports = router
