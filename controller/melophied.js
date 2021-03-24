import db from '../models/index.js';
import fanPageQueries from '../DB/queries/fanPage-queries.js';

const { User, FanPage } = db;
//add fanPage queries
const { addUpvote, removeUpvote } = fanPageQueries;

// return all fan pages ordered by date created
const exploreData = async (req, res) => {
    try {
        // send all fan pages based on created date desc order 
        const allPages = await FanPage.find().sort('-createdAt').select('pageTitle artistData');

        if (!allPages) throw 'noPages';

        return res.status(200).json({
            status: 200,
            message: 'Success',
            allPages,
        });
    } catch (error) {
        console.log(error)
        // return error message if no fan pages created yet
        if (error === "noPages") {
            return res.status(204).json({
                status: 204,
                message: 'No Fan Pages',
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
}

// return top five fan pages based on upvote
const topFivePages = async (req, res) => {
    try {
        // need to send top five fan pages with most upvotes 
        const topFivePages = await FanPage.aggregate([
            { $unwind: "$upvote" },
            { $group: { _id: "$_id", len: { $sum: 1 } } },
            { $sort: { len: -1 } },
            { $limit: 5 }
        ]);

        return res.status(200).json({
            status: 200,
            message: 'Success',
            topFivePages,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });
    }
}

const getFanPage = async (req, res) => {
    try {
        //get user data minus the password
        let foundFanPage = await FanPage.findById(req.params.fanPageID).lean(); // lean allows us to add extra key values

        if (foundFanPage === null) throw "noFanPageContent";

        const authorUsername = await User.findById(foundFanPage.author).select("username");

        if (!authorUsername) throw "noAuthor";
        foundFanPage.username = authorUsername.username;

        return res.status(200).json({
            status: 200,
            message: 'Success',
            foundFanPage,
        });

    } catch (error) {
        if (error === "noFanPageContent") {
            return res.status(204).json({
                status: 204,
                message: 'No Content',
            });
        }

        if (error === "noAuthor") {
            return res.status(204).json({
                status: 204,
                message: 'No Content Author',
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Server error',
        });

    }
}

//create FanPage
const createFanPage = async (req, res) => {
    try {
        const { artistData, pageTitle, pageDetail, trackList, albumList, userShows } = req.body;
        console.log(req.user);

        // throw error if pageTitle exists
        if (!pageTitle || !artistData) throw "missingRequiredFields";

        // create the user in DB
        const newFanPage = {
            author: req.user._id,
            artistData,
            pageTitle,
            pageDetail,
            trackList,
            albumList,
            userShows,
        };
        // send FanPage to db for creation
        const fanPage = await FanPage.create(newFanPage);

        return res.status(201).json({
            status: 201,
            message: 'FanPage was created successfully',
            fanPage,
            requestedAt: new Date().toLocaleString(),
        });

    } catch (error) {
        console.log(error); //keep just incase if db error

        //fan page missing required fields to create the page (either page title/artist/author)
        if (error === "missingRequiredFields") {
            return res.status(409).json({
                status: 409,
                message: "Missing Required Fields",
                received: req.body
            });
        }

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server error",
        });
    }
}

const updateUpvote = async (req, res) => {
    try {
        const userDBId = req.user._id;
        const fanPageId = req.params.fanPageID;

        //see if the current fanPage is already liked by the user
        const check = await FanPage.find({
            upvote: userDBId
        });

        if (!check.length) {
            //call addUpvote to add the user to upvote for fan page
            const updatedFanPage = await addUpvote(fanPageId, userDBId);
            //throw error if addUpvote sends false 
            if (updatedFanPage === false) throw "addUpvoteFailed";

            return res.status(200).json({
                status: 200,
                message: "Success, page upvoted by user",
                updatedFanPage
            });
        }

        const updatedFanPage = await removeUpvote(fanPageId, userDBId);
        //throw error if DB failed to update
        if (updatedFanPage === false) throw 'removeUpvoteFailed';

        return res.status(200).json({
            status: 200,
            message: "Success, page un-upvoted by user ",
            updatedFanPage
        });

    } catch (error) {
        // send error message if addUpvote fails
        if (error === "addUpvoteFailed") {
            return res.status(400).json({
                status: 400,
                message: 'addUpvote failed to update upvote',
            });
        }

        // send error message if addUpvote fails
        if (error === "removeUpvoteFailed") {
            return res.status(400).json({
                status: 400,
                message: 'removeUpvote failed to update upvote',
            });
        }

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server error",
        });
    }
}

const melophiedCtrls = {
    exploreData,
    createFanPage,
    getFanPage,
    topFivePages,
    updateUpvote,
}

export default melophiedCtrls;