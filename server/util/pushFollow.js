const { User } = require('../models/User');
const pushFollow = async (userFrom, userTo) => {
  const userto = await User.findById(userFrom);
  const user = await User.findById(userTo);
  user.notification.push({
    content: `${userto.name} started Following you`,
  });
  user.notification[0].contentType.user = userFrom;
  await user.save();
};
module.exports = pushFollow;
