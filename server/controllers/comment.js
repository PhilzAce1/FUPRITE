const { Comment } = require('../models/Comment');

exports.saveComment = (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });
    Comment.find({ _id: comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        pushNotification(
          comment.writer._id,
          'created a commented on a post',
          result.respondTo
        );

        return res.status(200).json({ success: true, result });
      });
  });
};
exports.getComments = (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
};
