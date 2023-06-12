const Movies = require('../models/movies');
const ValidationError = require('../utils/validation-err');
const NotFoundError = require('../utils/not-found-err');
const ForbiddenError = require('../utils/forbidden-err');

function createMovies(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movies) => {
      res.status(200).send({ movies });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Поля заполнины не коректно'));
      }

      return next(err);
    });
}

function getMovies(req, res, next) {
  Movies.find({})
    .then((movies) => {
      const resMovies = movies.filter((car) => {
        const ownerMovies = car.owner.toString();
        const userId = req.user._id.toString();
        const resMoviesFilter = ownerMovies === userId;
        return resMoviesFilter;
      });

      return res.send(resMovies);
    })
    .catch(next);
}

function deleteMovies(req, res, next) {
  Movies.findById(req.params._id)
    .then((movies) => {
      if (movies === null || !movies) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      const paramsId = req.user._id.toString();
      const moviesId = movies.owner.toString();

      if (paramsId === moviesId) {
        Movies.findByIdAndRemove(req.params._id)
          .then((removedMovies) => {
            const result = res.send({ data: removedMovies });
            return result;
          })
          .catch(next);
      } else {
        return next(new ForbiddenError('У вас нет прав для удаления данной карточки'));
      }
      return (Movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя.(то есть некоректный id)'));
      }
      return next(err);
    });
}

module.exports = { createMovies, getMovies, deleteMovies };
