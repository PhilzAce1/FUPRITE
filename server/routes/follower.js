const router = require('express').Router();
const {
  followersNumber,
  follow,
  following,
  unFollow,
} = require('../controllers/follower');

router.post('/followersNumber', followersNumber);

router.post('/following', following);

router.post('/follow', follow);

router.post('/unFollow', unFollow);
module.exports = router;
