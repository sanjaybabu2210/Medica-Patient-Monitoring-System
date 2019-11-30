
// const cloudinary = require('cloudinary');
// const dotenv=require('dotenv');

// dotenv.config();

// cloudinary.config({
//    cloud_name: 'tycoon', 
//   api_key: '167312485966359', 
//   api_secret: 'uD9LwJ61EhmLk4Y95rrXQNflIt8',
// })

// exports.uploads = (file, folder) => {
//     return new Promise(resolve => {
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             })
//         }, {
//             resource_type: "auto",
//             folder: folder
//         })
//     })
// }
