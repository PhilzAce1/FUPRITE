const express = require('express');
const router = express.Router();
const {
  getLikes,
  getDislike,
  upLike,
  unLike,
  upDislike,
  unDisLike,
} = require('../controllers/like');
const { Like } = require('../models/Likes');
const { Dislike } = require('../models/Dislike');

const { auth } = require('../middleware/auth');

//=================================
//             Likes DisLikes
//=================================

router.post('/getLikes', getLikes);

router.post('/getDislikes', getDislike);

router.post('/upLike', upLike);

router.post('/unLike', unLike);

router.post('/unDisLike', unDisLike);

router.post('/upDisLike', upDislike);

module.exports = router;
