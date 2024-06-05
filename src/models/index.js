const Booking = require("./Booking");
const City = require("./City");
const Hotel = require("./Hotel");
const Image = require("./Image");
const Review = require("./Review");
const User = require('./User');

City.hasMany(Hotel);
Hotel.belongsTo(City);

Hotel.hasMany(Image);
Image.belongsTo(Hotel);

Booking.belongsTo(User);
User.hasMany(Booking);

Booking.belongsTo(Hotel);
Hotel.hasMany(Booking);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);