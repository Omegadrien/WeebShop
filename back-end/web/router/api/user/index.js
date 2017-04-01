var router = require('express').Router();

router.use('/register', require('./register.js'));
router.use('/login', require('./login.js'));
router.use('/secret', require('./secret/index.js'));

module.exports = router;
