const express = require('express');
const router = express.Router();
const {
  createPost,
  getBlogs,
  getPost,
  getFollowingPosts,
  userPost,
  del,
  getLikePost,
  getUserComments,
  deletePost,
} = require('../controllers/blog');
const { Blog } = require('../models/Blog');
const { Follower } = require('../models/Follower');
const { Like } = require('../models/Likes');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const { auth } = require('../middleware/auth');
const pushNotification = require('../util/pushNotification');
const multer = require('multer');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4' && ext !== '.pdf') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');
//=================================
//             Blog
//=================================
router.post('/uploadfiles', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/createPost', createPost);

router.get('/getBlogs', getBlogs);

router.post('/getPost', getPost);

router.post('/getFollowingPosts', getFollowingPosts);

router.post('/userpost', userPost);

router.post('delete', del);

router.post('/getlikedpost', getLikePost);

router.post('/getusercomments', getUserComments);

router.delete('/deletepost', deletePost);
module.exports = router;
