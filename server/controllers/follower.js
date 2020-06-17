const pushFollow = require('../util/pushFollow');
const { Follower } = require('../models/Follower');

exports.followersNumber = async (req, res) => {
  try {
    const followersNumber = await Follower.find({
      userTo: req.body.userTo,
    }).count();
    const followingsNumber = await Follower.find({
      userFrom: req.body.userTo,
    }).count();
    res.status(200).json({
      success: true,
      followNumber: followersNumber,
      followingsNumber: followingsNumber,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.following = (req, res) => {
  Follower.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, follow) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (follow.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, following: result });
  });
};
exports.follow = (req, res) => {
  const follow = new Follower(req.body);

  follow.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    // pushNotification(req.body.userID, 'created a new post', blog._id);
    pushFollow(req.body.userFrom, req.body.userTo);
    return res.status(200).json({ success: true });
  });
};
exports.unFollow = (req, res) => {
  Follower.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
};
