const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
// para hacerlo los endpoints que se requieran privados así se evita que cualquier persona sin logearse  pueda manipular la base de datos

const cityRouter = express.Router();

cityRouter.route('/cities')
    .get(getAll)
    .post(verifyJWT, create);

cityRouter.route('/cities/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cityRouter;