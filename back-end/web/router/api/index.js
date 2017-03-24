var router = require('express').Router();

router.use('/news', require('./news/index.js'));
router.use('/newsMessage', require('./news/message.js'));

router.use('/directory', require('./directory/index.js'));

router.use('/getTitleID', require('./getTitleID/index.js'));

module.exports = router;
