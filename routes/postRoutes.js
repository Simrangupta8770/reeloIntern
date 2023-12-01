const express = require("express");
const {
  allPosts,
  createPost,
} = require("../controllers/postControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allPosts);
router.route("/post").post(protect, createPost);

module.exports = router;