// ../controllers/places.js

const express = require("express")
const router = express.Router()

// Array to hold places data
const places = []

router.use(express.urlencoded({ extended: true }))

router.get("/", (req, res) => {
  res.render("places/index", { data: { places: places } })
});

router.get("/new", (req, res) => {
  res.render("places/new")
});

router.post("/", (req, res) => {
  if (!req.body.pic) {
    req.body.pic = "/images/saddog.png"
  }
  if (!req.body.city) {
    req.body.city = "Anytown"
  }
  if (!req.body.state) {
    req.body.state = "USA"
  }
  places.push(req.body) // Push the new place to the places array
  res.redirect("/places")
});

router.get("/:id", (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id) || id < 0 || id >= places.length) {
    res.render("error404")
  } else if (!places[id]) {
    res.render("error404")
  } else {
    res.render("places/show", { place: places[id], id: id })
  }
})

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id)) {
    res.render("error404")
  } else if (!places[id]) {
    res.render("error404")
  } else {
    places.splice(id, 1)
    res.redirect("/places")
  }
})

router.get("/:id/edit", (req, res) => {
  let id = Number(req.params.id)
  if (isNaN(id) || id < 0 || id >= places.length) {
    res.render("error404")
  } else if (!places[id]) {
    res.render("error404")
  } else {
    res.render("places/edit", { place: places[id], id })
  }
})

router.put('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id) || id < 0 || id >= places.length) {
        res.render('error404')
    } else if (!places[id]) {
        res.render('error404')
    } else {
        if (!req.body.pic) {
            req.body.pic = 'http://placekitten.com/400/400'
        }
        if (!req.body.city) {
            req.body.city = 'Anytown'
        }
        if (!req.body.state) {
            req.body.state = 'USA'
        }
  
        places[id] = req.body;
        res.redirect(`/places/${id}`)
    }
})

module.exports = router
