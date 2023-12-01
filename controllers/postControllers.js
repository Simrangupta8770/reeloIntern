const asyncHandler = require("express-async-handler");
const Posts = require("../models/postModel");
const User = require("../models/userModel");
// const Chat = require("../models/chatModel");


const allPosts = asyncHandler(async (req, res) => {
  try {
    
    const data=await Posts.find();
    
    res.json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const createPost = asyncHandler(async (req, res) => {
  const { content,img } = req.body;

  if (!content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newPost = {
    creator: req.user._id,
    content: content,
    img,img
  };

  try {
    var post = await Posts.create(newPost);


    res.json(post);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allPosts, createPost };