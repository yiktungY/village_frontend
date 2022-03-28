const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router
  .route("/")
  .post(postsController.createNewPost)
  .get(postsController.getAllPost);

module.exports = router;
