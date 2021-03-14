const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    author: [{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }],
    artist: {
      type: String,
      required: true,
    },
    page_title: {
      type: String,
      required: true,
    },
    page_bio: {
        type: String,
        required: false,
    },
    user_tracks: {
        type: String,
        required: false,
    },
    user_albums: {
        type: String,
        required: false,
    },
    user_shows: {
        type: String,
        required: false,
    },
    upvote: [{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
  }
);

const FanPage = mongoose.model('FanPage', userSchema);

module.exports = FanPage;
