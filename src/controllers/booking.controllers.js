const catchError = require('../utils/catchError');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const City = require('../models/City');
const Image = require('../models/Image');


const getAll = catchError(async (req, res) => {
    const results = await Booking.findAll({
        where: { userId: req.user.id },
        include: [{
            model: Hotel,
            include: [Image, City]
        }],
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { checkIn, checkOut, hotelId } = req.body;
    const result = await Booking.create({
        checkIn,
        checkOut,
        hotelId,
        userId: req.user.id,
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Booking.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Booking.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Booking.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
} 