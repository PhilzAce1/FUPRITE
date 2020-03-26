const router = require('express').Router();
const { Follower } = require('../models/Follower');

router.post('/followersNumber', (req, res) => {
  Follower.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, subscribeNumber: subscribe.length });
  });
});

router.post('/following', (req, res) => {
  Follower.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom
  }).exec((err, follow) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (follow.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, following: result });
  });
});
router.post('/follow', (req, res) => {
  const follow = new Follower(req.body);

  follow.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/unFollow', (req, res) => {
  console.log(req.body);
  Follower.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});
module.exports = router;
