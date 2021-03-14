import db from '../models/index.js';

// all movies
const index = async ( req, res ) => {
  try {
    const users = await db.User.find({});

    // res.render( 'home.ejs', { context: movies })

    res.status(200).json({
      status: 200,
      users,
      requestAt: new Date().toLocaleString()
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Sorry something went wrong. Internal server Error',
      requestAt: new Date().toLocaleString()
    });
  };
};

// createMovie,
const createUser = async ( req, res ) => {
  try {
    const foundUser = await db.User.findOne(req.body);
    
    if ( foundUser ) throw 'foundUser';

    const user = await db.User.create(req.body);

    res.status(201).json({
      status: 201,
      movie,
      requestAt: new Date().toLocaleString()
    });

  } catch (error) {
    if ( error === 'foundUser' ) return res.status(400).json({
      status: 400,
      message: 'this user already exists',
      requestAt: new Date().toLocaleString()
    });

    res.status(500).json({
      status: 500,
      message: 'Sorry something went wrong. Internal server Error',
      requestAt: new Date().toLocaleString()
    });

  };
};

// // movieDetails,
// const showMovie = async ( req, res ) => {
//   try {

//     const movie = await db.Movie.findById( req.params.movieId );

//     return res.status(200).json({
//       status: 200,
//       movie,
//       requestedAt: new Date().toLocaleString(),
//     }); 
    
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Sorry something went wrong. Internal server Error',
//       requestAt: new Date().toLocaleString()
//     });
//   }
// };

// // movieUpdate,
// const updateMovie = async ( req, res ) => {
//   try {

//     const updatedMovie = await db.Movie.findByIdAndUpdate(
//       req.params.movieId,
//       {
//         $set: {
//           ...req.body
//         }
//       },
//       {
//         new: true
//       }
//     );

//     return res.status(200).json({
//       status: 200,
//       updatedMovie,
//       requestedAt: new Date().toLocaleString(),
//     });

    
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Sorry something went wrong. Internal server Error',
//       requestAt: new Date().toLocaleString()
//     });
//   };
// };


// // movieDelete,
// const destroy = async ( req, res ) => {
//   try {
//     const deletedMovie = await db.Movie.findByIdAndDelete( req.params.movieId );

//     return res.status(200).json({
//       status: 200,
//       deletedMovie,
//       requestedAt: new Date().toLocaleString(),
//     });
    
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Sorry something went wrong. Internal server Error',
//       requestAt: new Date().toLocaleString()
//     });
//   }
// };


// const moviesCtrl = {
//   index,
//   createMovie,
//   showMovie,
//   updateMovie,
//   destroy,
// }

export default userCtrl;