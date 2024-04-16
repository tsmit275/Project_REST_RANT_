const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let places = [
        { name: 'Restaurant A', city: 'City A', state: 'State A', cuisines: 'Cuisines A', pic: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { name: 'Restaurant B', city: 'City B', state: 'State B', cuisines: 'Cuisines B', pic: 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=600' }
    ];

    res.render('places/index', { places: places }); // Pass places array to the view
});

module.exports = router;
