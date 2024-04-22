const express = require('express');
const router = express.Router();
const places = require('../models/places.js');

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('places/index', { places: places }); 
});

router.get('/new', (req, res) => {
    res.render('places/new');
});

router.post('/', (req, res) => {
    if (!req.body.pic) {
      // Default image if one is not provided
      req.body.pic = '/images/saddog.png';
    }
    if (!req.body.city) {
      req.body.city = 'Anytown';
    }
    if (!req.body.state) {
      req.body.state = 'USA';
    }
    places.push(req.body);
    res.redirect('/places');
});

module.exports = router;
