const mongoose = require('mongoose');
require('mongoose-type-url');
const { RegularForLink } = require('../utils/variables');

const moviesScheme = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator(v) {
        return (RegularForLink.test(v));
      },
      message: 'Не валидная сылка, сылка должна начинатся: "https//"',
    },
  },
  trailerLink: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator(v) {
        return (RegularForLink.test(v));
      },
      message: 'Не валидная сылка, сылка должна начинатся: "https//"',
    },
  },
  thumbnail: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator(v) {
        return (RegularForLink.test(v));
      },
      message: 'Не валидная сылка, сылка должна начинатся: "https//"',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movies', moviesScheme);
