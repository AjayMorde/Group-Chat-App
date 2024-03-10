const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");
const userAuthentication = require("../middleware/auth");

router.post("/createGroup", userAuthentication.authenticate, groupController.createGroup);
router.get("/getGroups", userAuthentication.authenticate, groupController.getGroups);
router.post("/addToGroup", userAuthentication.authenticate, groupController.addTogroup);
//Including :id in the route path allows these routes to capture the  ID from the URL.
//This ID is then used to identify the specific expense to be deleted or edited.
router.post(
  "/deleteFromGroup",
  userAuthentication.authenticate,
  groupController.deleteFromGroup
);

router.get(
  "/groupMembers/:groupName",
  userAuthentication.authenticate,
  groupController.groupMembers
);

module.exports = router;
