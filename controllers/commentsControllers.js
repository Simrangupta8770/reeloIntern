const asyncHandler = require("express-async-handler");
const Posts = require("../models/postModel");
const User = require("../models/userModel");
const Comments = require("../models/commentsModel");


const allComments = asyncHandler(async (req, res) => {
  try {
    
    const data=await Posts.findById(req.body.posts).populate('comments');
    res.json(data.comments);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const createComment = asyncHandler(async (req, res) => {
    
  try{const newComment = new Comments({
        content:req.body.content,
        sender:req.user_id,
      });
      const existingPost = await Posts.findById(req.body.postId);

    if (!existingPost) {
      console.error('Post not found.');
      return;
    }

  
    const savedComment = await newComment.save();
    existingPost.comments.push(savedComment._id);

    const updatedPost = await existingPost.save();
    const populatedPost = await Posts.findById(updatedPost._id).populate('comments');

    console.log('Comment added to post:', populatedPost);
    res.send(populatedPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allComments, createComment };