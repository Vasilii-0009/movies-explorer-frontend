const router = require('express').Router();
const { createMovies, getMovies, deleteMovies } = require('../controllers/movies');
const { validitiJoiCreatMovies, valisitiJoiDeleteMovies } = require('../utils/valditiCelebrateJoi');

router.post('/', validitiJoiCreatMovies, createMovies);

router.get('/', getMovies);

router.delete('/:_id', valisitiJoiDeleteMovies, deleteMovies);

module.exports = router;
