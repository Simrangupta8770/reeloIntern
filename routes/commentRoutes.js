const express = require("express");
const {
  allComments,
  createComment,
} = require("../controllers/commentsControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allComments);
router.route("/").post(protect, createComment);

module.exports = router;