const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const followersSchema = mongoose.Schema(
  {
    userTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Follower = mongoose.model('Follower', followersSchema);

module.exports = { Follower };
