const router = require('express').Router();

const { getUser, patchUser } = require('../controllers/users');
const { validitiJoiPatchUser } = require('../utils/valditiCelebrateJoi');

router.get('/me', getUser);

router.patch('/me', validitiJoiPatchUser, patchUser);

module.exports = router;
