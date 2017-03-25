var router = require('express').Router();

router.use('/news', require('./news/index.js'));
router.use('/newsMessage', require('./news/message.js'));

router.use('/directory', require('./directory/index.js'));

router.use('/game', require('./game/index.js'));
router.use('/game/price', require('./game/price.js'));

router.use('/games', require('./search/index.js'));

router.use('/download', require('./download/index.js'));

module.exports = router;
