const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const { Follower } = require('../models/Follower');
//=================================
//             User
//=================================

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    // sendEmail(doc.email, doc.name, null, "welcome");
    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});
router.post('/profile', async (req, res) => {
  // return res.send('i am working');
  try {
    const user = await User.find({ _id: req.body.userId }).select({
      _id: 1,
      email: 1,
      username: 1,
      createdAt: 1,
    });
    const followerNumber = await Follower.find({
      userFrom: req.body.userId,
    }).count();
    const followings = await Follower.find({
      userTo: req.body.userId,
    }).count();
    res.status(200).json({
      user,
      followerNumber,
      followings,
    });
  } catch (err) {
    res.status(400).json({ success: false }).send(err);
  }
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});
router.get('/search', async (req, res) => {
  let { search } = req.query;
  if (search.match(/[^a-zA-Z0-9]+/g)) {
    return res.json({ success: true, users: [] });
  }
  const regex = new RegExp(`^${search}`, 'gi');
  User.find({ $or: [{ username: regex }, { name: regex }] })
    .limit(7)
    .select({ password: 0, token: 0 })
    .exec(function (err, user) {
      if (err) {
        res.status(400).json({ success: false });
      } else {
        if (user.length < 1) {
          user = [];
        }
        res.json({ success: true, users: user });
      }
    });
});
router.post('/userdetails', async (req, res) => {
  User.find({ _id: req.body.userId })
    .select({
      password: 0,
    })
    .exec((err, userDetails) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, user: userDetails });
    });
});
module.exports = router;
