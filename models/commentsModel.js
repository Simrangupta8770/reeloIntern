const mongoose = require('mongoose')
const commentsSchema = mongoose.Schema({
    posts: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    content: { type: String, trim: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
},{
    timeStamps: true
}
    
);

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;