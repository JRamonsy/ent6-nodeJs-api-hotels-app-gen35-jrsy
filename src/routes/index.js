const express = require('express');
const userRouter = require('./user.routes');
const cityRouter = require('./city.routes');
const hotelRouter = require('./hotel.routes');
const imageRouter = require('./image,routes');
const bookingRouter = require('./booking.routes');
const reviewRouter = require('./review.routes');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter)
router.use(cityRouter)
router.use(hotelRouter)
router.use(imageRouter)
router.use(bookingRouter)
router.use(reviewRouter)

module.exports = router;