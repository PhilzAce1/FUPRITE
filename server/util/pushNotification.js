const { User } = require('../models/User');
const { Follower } = require('../models/Follower');

const pushNotification = (userFrom, contentType, blogid) => {
  if (!blogid) {
    blogid = userFrom;
  }
  console.log(userFrom, contentType);
  Follower.find({ userFrom: userFrom }).exec((err, followers) => {
    if (err) return 'unable to push notification';
    let followedUser = [];
    followers.map((x, i) => {
      followedUser.push(x.userTo);
    });
    followedUser.map(async (x, i) => {
      const user = await User.findById(x);
      user.notification.push({
        content: `${user.name} ${contentType}`,
      });
      if (contentType === 'followed you') {
        user.notification[0].contentType.blog = userFrom;
      } else {
        user.notification[0].contentType.blog = blogid;
      }
      console.log(user.notification);
    });
  });
};

module.exports = pushNotification;
