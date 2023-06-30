const Router = require('express');
const ratingController = require('../controllers/ratingController');

const router = new Router();

router.post('/', ratingController.setRating);
router.get('/:id', ratingController.getDeviceRating);

module.exports = router;
