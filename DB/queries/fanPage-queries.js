import db from '../../models/index.js';

const { FanPage } = db;

//add user to the upvote array for fan page
const addUpvote = async (pageId, userId) => {
    try {
        const updatedFanPage = await FanPage.findByIdAndUpdate(
            pageId,
            {
                $push: {        //appends to the upvote array
                    "upvote": userId
                }
            },
            {
                new: true
            }
        );
        return updatedFanPage;

    } catch (error) {
        //if update fails return false 
        return false;
    }
}

//remove the user from upvote for fan page
const removeUpvote = async (pageId, userId) => {
    try {
        const updatedFanPage = await FanPage.findByIdAndUpdate(
            pageId,
            {
                $pull: {
                    "upvote": userId
                }
            },
            {
                new: true
            }
        );
        return updatedFanPage;

    } catch (error) {
        //if update fails return false 
        return false;
    }
}


const fanPageQueries = {
    addUpvote,
    removeUpvote,
}

export default fanPageQueries;