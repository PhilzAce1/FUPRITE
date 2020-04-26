const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');
const { Follower } = require('../models/Follower');
const path = require('path');
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

router.post('/register', async (req, res) => {
  try {
    const userExist = await User.find({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    console.log(req.body, userExist);
    if (userExist.length > 0)
      return res.status(200).json({
        success: false,
        msg: 'User already Exist try another Username and email',
      });
    const user = new User(req.body);

    user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      // sendEmail(doc.email, doc.name, null, "welcome");
      return res.status(200).json({
        success: true,
      });
    });
  } catch (e) {
    console.log(e.message);
  }
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
router.post('/uploadProfilePic', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      success: false,
      msg: 'no file was submitted please check again',
    });
  }
  const { userId } = req.files;
  const file = req.files.file;
  file.mv(
    `${path.resolve(__dirname, '../..')}/uploads/${file.md5}_${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      User.updateOne(
        { _id: userId },
        {
          $set: {
            image: `/uploads/${file.md5}_${file.name}`,
          },
        }
      ).exec((err, data) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, msg: 'something went wrong' });
      });
      res.json({ filePath: `/uploads/${file.md5}_${file.name}` });
    }
  );
});
router.patch('/updateprofile', async (req, res) => {
  const { name, description, level, department, date } = req.body.dataToSubmit;
  try {
    const updated = await User.findByIdAndUpdate(req.body.userId, {
      $set: {
        name,
        description,
        level,
        department,
        date,
      },
    });
    res.status(200).json({ success: true, msg: ' successful Update' });
  } catch (error) {
    res.status(402).json({ success: false, msg: error });
  }
});
router.post('/followupdate', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    // pushFollow
    if (user.notification) {
      return res
        .status(200)
        .json({ success: true, notifications: user.notification });
    } else {
      return res
        .status(200)
        .json({ success: true, notifications: 'no notifications' });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ success: false, msg: e.message });
  }
});
router.post('/createupdate', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user.notification.blog) {
      return res
        .status(200)
        .json({ success: true, notifications: user.notification.blog });
    } else {
      return res
        .status(200)
        .json({ success: true, notifications: 'no notifications' });
    }
  } catch (e) {
    res.status(400).json({ success: false, msg: e.message });
  }
});
router.post('/whotofollow', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    const { level, department } = user;
    if (!level || !department)
      return res.status(200).json({
        success: false,
        msg: 'Please Complete You registeration to Use this feature',
      });
    const usersToFollow = await User.find({
      $or: [{ level }, { department }],
    }).select({
      name: 1,
      username: 1,
      image: 1,
      email: 1,
    });
    const mainUsers = [];
    for (const user of usersToFollow) {
      if (user._id != userId) {
        mainUsers.push({ user });
      }
    }
    res.json({ success: true, users: mainUsers });
  } catch (ex) {
    console.log(ex.message);
    res.status(500).json({
      success: false,
      msg: 'Internal Server error',
    });
  }
});
module.exports = router;
