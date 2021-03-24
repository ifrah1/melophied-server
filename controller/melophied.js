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
            requestAt: new Date().toLocaleString()
        });
    } catch (error) {
        console.log(error)
        // return error message if no fan pages created yet
        if (error === "noPages") {
            return res.status(204).json({
                status: 204,
                message: 'No Fan Pages',
                requestAt: new Date().toLocaleString()
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Server error',
            requestAt: new Date().toLocaleString()
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
            requestAt: new Date().toLocaleString()
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 500,
            message: 'Server error',
            requestAt: new Date().toLocaleString()
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
            requestAt: new Date().toLocaleString()
        });

    } catch (error) {
        if (error === "noFanPageContent") {
            return res.status(204).json({
                status: 204,
                message: 'No Content',
                requestAt: new Date().toLocaleString()
            });
        }

        if (error === "noAuthor") {
            return res.status(204).json({
                status: 204,
                message: 'No Content Author',
                requestAt: new Date().toLocaleString()
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Server error',
            requestAt: new Date().toLocaleString()
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
                received: req.body,
                requestAt: new Date().toLocaleString()
            });
        }

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server error",
            requestAt: new Date().toLocaleString()
        });
    }
}

// FanPage Delete
const destroyFanPage = async (req, res) => {
    try {
        const deletedFanPage = await db.FanPage.findByIdAndDelete(req.params.fanPageID);
        return res.status(200).json({
            status: 200,
            message: 'Fan Page Deleted Successfully!!!!',
            deletedFanPage,
            requestedAt: new Date().toLocaleString(),
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Sorry something went wrong. Internal server Error',
            requestAt: new Date().toLocaleString()
        });
    }
};

const updateFanPage = async (req, res) => {
    try {
        // // Validation for TitlePage is not null
        const { pageTitle } = req.body;

        if (!pageTitle) throw "missingRequiredFields";

        // Update the fanPage information
        const updatedFanPage = await FanPage.findByIdAndUpdate(
            req.params.fanPageID,
            {
                $set: {
                    ...req.body
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            status: 200,
            message: 'Success',
            updatedFanPage,
            requestAt: new Date().toLocaleString()
        });

    } catch (error) {
        console.log(error); //keep just incase if db error

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            requestAt: new Date().toLocaleString()
        });
    }
}

const updateUpvote = async (req, res) => {
    try {
        const userDBId = req.user._id;
        const fanPageId = req.params.fanPageID;

        //see if the current fanPage is already liked by the user
        const check = await FanPage.find({
            _id: fanPageId,
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
                updatedFanPage,
                requestAt: new Date().toLocaleString()
            });
        }

        const updatedFanPage = await removeUpvote(fanPageId, userDBId);
        //throw error if DB failed to update
        if (updatedFanPage === false) throw 'removeUpvoteFailed';

        return res.status(200).json({
            status: 200,
            message: "Success, page un-upvoted by user ",
            updatedFanPage,
            requestAt: new Date().toLocaleString()
        });

    } catch (error) {
        console.log(error);

        // send error message if addUpvote fails
        if (error === "addUpvoteFailed") {
            return res.status(400).json({
                status: 400,
                message: 'addUpvote failed to update upvote',
                requestAt: new Date().toLocaleString()
            });
        }

        // send error message if addUpvote fails
        if (error === "removeUpvoteFailed") {
            return res.status(400).json({
                status: 400,
                message: 'removeUpvote failed to update upvote',
                requestAt: new Date().toLocaleString()
            });
        }

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            requestAt: new Date().toLocaleString()
        });
    }
}

const melophiedCtrls = {
    exploreData,
    createFanPage,
    getFanPage,
    topFivePages,
    destroyFanPage,
    updateFanPage,
    updateUpvote,
}

export default melophiedCtrls;