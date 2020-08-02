const { Blog } = require('../models/Blog');
const { Follower } = require('../models/Follower');
const { Like } = require('../models/Likes');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');

const pushNotification = require('../util/pushNotification');

exports.createPost = async (req, res) => {
  let blog = new Blog({
    content: req.body.content,
    writer: req.body.userID,
    title: req.body.title,
  });
  const blogExist = await Blog.find({ title: req.body.title });
  if (blogExist.length > 0) {
    return res
      .status(200)
      .json({ success: false, msg: 'article with this title exist ' });
  }
  blog.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    pushNotification(req.body.userID, 'created a new post', blog._id);
    res.status(200).json({ success: true, postInfo });
  });
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('writer');
    res.status(200).json({ success: true, blogs });
  } catch (e) {
    //   if (err) return
    res.status(400).send(err);
  }
};

exports.getPost = (req, res) => {
  Blog.findOne({ _id: req.body.postId })
    .populate('writer')
    .exec((err, post) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, post });
    });
};

exports.getFollowingPosts = (req, res) => {
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
};

exports.userPost = (req, res) => {
  Blog.find({ writer: req.body.userId })
    .populate('writer')
    // .countDocuments()
    .exec((err, blogs) => {
      if (err) return res.status(400).send(err);
      res.json({ success: true, blogs });
    });
};

exports.del = async (req, res) => {
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
};

exports.getLikePost = async (req, res) => {
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
};

exports.getUserComments = async (req, res) => {
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
};

exports.deletePost = async (req, res) => {
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
};
