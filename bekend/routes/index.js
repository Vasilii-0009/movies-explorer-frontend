const router = require('express').Router();
const { creatUser, loginUser } = require('../controllers/users');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const authorization = require('../middlewares/auth');
const NotFoundError = require('../utils/not-found-err');
const { valditiJoiSignUp, validiJoiSignIn } = require('../utils/valditiCelebrateJoi');

router.use('/signup', valditiJoiSignUp, creatUser);

router.use('/signin', validiJoiSignIn, loginUser);

router.use(authorization);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('запрос по несуществующиму адресу'));
});

module.exports = router;
