const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt'); // importacín bcrypt
const jwt = require('jsonwebtoken'); //importacion webtoken

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body; // se desestructura req.body
  const encriptedPassword = await bcrypt.hash(password, 10); // 1er password y nivel seguridad
  const result = await User.create({
    firstName, lastName, email, password: encriptedPassword, gender 
  }); // se quita req.body y se agregan los campos de la desestructuración y en password se pasa la contraseña encriptada.
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, gender } = req.body; // para evitar actualización de algun campo se desestructuran solo los campos que se quieran actualizar y se traen del req.body
    const result = await User.update(
        {
          firstName, lastName, email, gender // se colocan aqui los que se pueden actualizar.
        },
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { user },
    process.env.TOKEN_SECRET, //clave secreta
    { expiresIn: '1d' }// tiempo en el que expira el token
  );
  return res.json({user, token})
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
  update,
    login,
}