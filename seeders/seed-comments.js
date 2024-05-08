// seeders/seed-comments.js

const mongoose = require('mongoose')
const { Place, Comment } = require('../models')

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/rest-rant', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        const place = await Place.findOne({ name: 'H-Thai-ML' })

        const comment1 = new Comment({
            author: 'John Doe',
            stars: 4,
            content: 'This place is amazing!',
            rant: false
        })

        const comment2 = new Comment({
            author: 'Jane Smith',
            stars: 3.5,
            content: 'Not bad, but could be better.',
            rant: true
        })

        await Promise.all([
            comment1.save(),
            comment2.save()
        ])

        place.comments.push(comment1, comment2)
        await place.save()

        console.log('Comments seeded successfully!')
        mongoose.connection.close()
    } catch (error) {
        console.error(error)
    }
})()
