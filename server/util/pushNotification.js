const { User } = require('../models/User');
const { Follower } = require('../models/Follower');

const pushNotification = (userFrom, contentType, blogid) => {
  Follower.find({ userFrom: userFrom }).exec((err, followers) => {
    if (err) return 'unable to push notification';
    let followedUser = [];
    followers.map((x, i) => {
      followedUser.push(x.userTo);
    });
    followedUser.map(async (x, i) => {
      const user = await User.findById(x);
      user.notification.blog({
        content: `${user.name} ${contentType}`,
        blog: blogid,
      });
    });
  });
};

module.exports = pushNotification;
