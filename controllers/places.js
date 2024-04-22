const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    let places = [
        { name: 'Showmers', city: 'Augusta', state: 'GA', cuisines: 'Soul Food', pic: 'https://images.pexels.com/photos/12118980/pexels-photo-12118980.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { name: 'Nayas', city: 'Houston', state: 'TX', cuisines: 'American', pic: 'https://images.unsplash.com/photo-1555196301-9acc011dfde4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxhbWVyaWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D' }
    ];

    res.render('places/index', { places: places }); 
});

router.get('/new', (req, res) => {
    res.render('places/new');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('POST /places');
});

module.exports = router;
