const { celebrate, Joi } = require('celebrate');

const { RegularForLink } = require('./variables');

const valditiJoiSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validiJoiSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validitiJoiCreatMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(RegularForLink),
    trailerLink: Joi.string().required().pattern(RegularForLink),
    thumbnail: Joi.string().required().pattern(RegularForLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const valisitiJoiDeleteMovies = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().required().length(24),
  }),
});

const validitiJoiPatchUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  valditiJoiSignUp,
  validiJoiSignIn,
  validitiJoiCreatMovies,
  valisitiJoiDeleteMovies,
  validitiJoiPatchUser,
};
