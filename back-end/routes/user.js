const express = require("express");
const router = require("express").Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUser);

router
  .route("/:id")
  .get(userController.getUserById)
  //   .post(userController.addUserProfile)
  .put(userController.updateUserProfile);

module.exports = router;
