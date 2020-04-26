const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const { Follower } = require('../models/Follower');
const { Like } = require('../models/Likes');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');
const { auth } = require('../middleware/auth');
const pushNotification = require('../util/pushNotification');
// const Like = require('../models/')
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

router.post('/createPost', (req, res) => {
  let blog = new Blog({
    content: req.body.content,
    writer: req.body.userID,
    title: req.body.title,
  });

  blog.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    pushNotification(req.body.userID, 'created a new post', blog._id);
    res.status(200).json({ success: true, postInfo });
  });
});

router.get('/getBlogs', (req, res) => {
  console.log(req.headers);
  Blog.find()
    .populate('writer')
    .exec((err, blogs) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, blogs });
    });
});

router.post('/getPost', (req, res) => {
  Blog.findOne({ _id: req.body.postId })
    .populate('writer')
    .exec((err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, post });
    });
});
router.post('/getFollowingPosts', (req, res) => {
  Follower.find({ userFrom: req.body.userFrom }).exec((err, followers) => {
    if (err) return res.status(400).send(err);
    let followedUser = [];
    followers.map((x, i) => {
      followedUser.push(x.userTo);
    });
    Blog.find({ writer: { $in: followedUser } })
      .populate('writer')
      .exec((err, blogs) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, blogs });
      });
  });
});
router.post('/userpost', (req, res) => {
  Blog.find({ writer: req.body.userId })
    .populate('writer')
    // .countDocuments()
    .exec((err, blogs) => {
      if (err) return res.status(400).send(err);
      res.json({ success: true, blogs });
    });
});
router.post('delete', async (req, res) => {
  const yourBlog = await Blog.find({
    _id: req.body._id,
    writer: req.body.userId,
  }).count();
  if (!yourBlog)
    return res
      .status(403)
      .json({ success: false, msg: 'this is not your Blog' });
  Blog.deleteOne({ _id: req.body._id, writer: req.body.userId }).exec(
    (err, x) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    }
  );
});
router.post('/getlikedpost', async (req, res) => {
  try {
    const post = [];

    const likedComment = await Like.find({ userId: req.body.userId }).select({
      videoId: 1,
      _id: 0,
    });
    let LC = [...likedComment].filter((x) => JSON.stringify(x) !== '{}');
    LC.map((x) => post.push(x.videoId));

    // const posts = [...commentedPost].filter((x) => JSON.stringify(x) !== '{}');
    // posts.map((x) => post.push(x.videoId));
    Blog.find({ _id: { $in: post } })
      .populate('writer')
      .exec((err, blogs) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, blogs });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(err);
  }
});
router.post('/getusercomments', async (req, res) => {
  try {
    const post = [];

    const commentedPost = await Comment.find({
      writer: req.body.userId,
    }).select({ postId: 1, _id: 0 });

    const posts = [...commentedPost].filter((x) => JSON.stringify(x) !== '{}');
    posts.map((x) => post.push(x.videoId));
    Blog.find({ _id: { $in: post } })
      .populate('writer')
      .exec((err, blogs) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, blogs });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(err);
  }
});
router.delete('/deletepost', async (req, res) => {
  try {
    const { userId, blogId } = req.body;
    const blog = await Blog.findById(blogId).populate('writer');
    if (blog.writer._id !== userId) {
      return res.status(401).json({
        success: false,
        msg: 'User are not authorized to make this action',
      });
    } else {
      await Blog.findByIdAndDelete(blogId);
      res.status(200).json({ success: true, msg: 'deleted' });
    }
  } catch (error) {}
});
module.exports = router;
