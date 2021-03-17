import mongoose from 'mongoose';

const FanPageSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        artist: {
            type: String,
            required: true,
        },
        pageTitle: {
            type: String,
            required: true,
        },
        pageBio: {
            type: String,
            required: false,
        },
        userTracks: [{
            type: String,
            required: false,
        }],
        userAlbums: [{
            type: String,
            required: false,
        }],
        userShows: [{
            type: String,
            required: false,
        }],
        upvote: [{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
    }
);

const FanPage = mongoose.model('FanPage', FanPageSchema);

export default FanPage;