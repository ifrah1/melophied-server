import db from '../models/index.js';

const { User, FanPage } = db;

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
        const { artistData, pageTitle, pageBio, trackList, albumList, userShows } = req.body;
        console.log(req.user);

        // throw error if pageTitle exists
        if (!pageTitle || !artistData) throw "missingRequiredFields";

        // create the user in DB
        const newFanPage = {
            author: req.user._id,
            artistData,
            pageTitle,
            pageBio,
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

const updateFanPage = async (req, res) => {
    try {
        // // Validation for TitlePage is not null
        if(FanPage.pageTitle === null) {
            return res.status(409).json({
                status: 409,
                message: "Missing Required Fields",
                received: req.body
            });
        }
        
        // Update the fanPage information
        const updatedFanPage = await FanPage.findByIdAndUpdate(
            req.params.fanPageID,
            {
                $set:{
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
        });

    } catch (error) {
        console.log(error); //keep just incase if db error

        // all other errors 
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
}

const melophiedCtrls = {
    exploreData,
    createFanPage,
    getFanPage,
    topFivePages,
    updateFanPage,
}

export default melophiedCtrls;