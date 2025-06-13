const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./users');
const profileRoutes = require('./profiles');

// Import Swagger if applicable
router.use('/', require('./swagger'));

// Home route
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the home page!');
});

// Use the routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);

module.exports = router;
