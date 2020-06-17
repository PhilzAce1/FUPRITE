const express = require('express');
const router = express.Router();
const { getComments, saveComment } = require('../controllers/comment');

const { auth } = require('../middleware/auth');

//=================================
//             Subscribe
//=================================

router.post('/saveComment', saveComment);

router.post('/getComments', getComments);

module.exports = router;
