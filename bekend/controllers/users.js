const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { NODE_ENV, JWT_SECRET } = require('../config');

const NotFoundError = require('../utils/not-found-err');
const ValidationError = require('../utils/validation-err');
const DublicatError = require('../utils/duplicate-err');
const UnauthorizedError = require('../utils/unauthorized-err');

const { StatusOk, StatusOkCreat } = require('../utils/variables');

function creatUser(req, res, next) {
  const { name, email, password } = req.body;
  bcryptjs.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(StatusOkCreat).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поля заполнины не коректно'));
      }
      if (err.code === 11000) {
        return next(new DublicatError('Пользователь с такими данными уже существует'));
      }
      return next(err);
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неправильные почта или пароль '));
      }

      return bcryptjs.compare(password, user.password)

        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
            res.send({ token });
          }
          return next(new UnauthorizedError('Неправильные почта или пароль '));
        });
    })
    .catch(next);
}

function getUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res.status(StatusOk).send(user);
    })
    .catch(next);
}

function patchUser(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((newUser) => {
      if (newUser) {
        const result = res.status(StatusOk).send(newUser);
        return result;
      }
      return next(new NotFoundError('Пользователь по указанному _id не найден'));
    })
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        return next(new DublicatError('Поле email не должно дублироватся '));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поля заполнины не коректно'));
      }
      return next(err);
    });
}

module.exports = {
  creatUser,
  loginUser,
  getUser,
  patchUser,
};
