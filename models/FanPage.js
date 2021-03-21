import mongoose from 'mongoose';

const FanPageSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        artistData: {
            type: Map,
            of: String,
            required: true,
        },
        pageTitle: {
            type: String,
            required: true,
        },
        pageDetail: {
            type: String,
            required: false,
        },
        trackList: [{
            type: Map,
            of: String,
            required: false,
        }],
        albumList: [{
            type: Map,
            of: String,
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