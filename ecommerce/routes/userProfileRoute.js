const express = require("express");
const router = express.Router();
const userProfileController = require("../controller/userProfileController.js");
const WithAuth = require('../middleware/auth.js');

router.get("/userProfiles", userProfileController.getAllUserProfiles);
router.get("/userProfile/:id", userProfileController.getUserProfileById);
router.post("/userProfile", userProfileController.createUserProfile);
router.delete("/userProfile/:id", userProfileController.deleteUserProfile);
router.put("/userProfile/:id", userProfileController.editUserProfile);

module.exports = router;