var router = require('express').Router();

router.use("/api", require('./api'));
router.use("/login", require('./login'));
router.use("/secret", require('./secret'));

module.exports = router;
