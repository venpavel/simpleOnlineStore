const Router = require('express');
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const basketRouter = require('./basketRouter');
const ratingRouter = require('./ratingRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter);
router.use('/rating', ratingRouter);

module.exports = router;
