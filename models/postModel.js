const mongoose = require('mongoose')
const postsSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    img: { type: String, trim: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
    
},{
    timeStamps: true
}
    
);

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;