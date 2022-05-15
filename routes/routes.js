const express = require("express");
const router = express.Router();
const index = require("../controller/index");
const filActualite = require("../controller/filActualite");
//authentification/profil
const myProfile = require("../controller/authentificationController/myProfile");
const otherUserProfile = require("../controller/friendsController/otherUserProfile");
const signUp = require("../controller/authentificationController/signUp");
const postSignUp = require("../controller/authentificationController/postSignUp");
const signin = require("../controller/authentificationController/signin");
const postSignin = require("../controller/authentificationController/postSignin");
//friends features
const addFriends = require("../controller/friendsController/addFriends");
const searchFriends = require("../controller/friendsController/searchFriends"); 
const deleteFriend = require("../controller/friendsController/deleteFriend");
//spots features
const getCreateSpot = require("../controller/spotsController/getCreateSpot");
const createSpot = require("../controller/spotsController/createSpot");
const getSpot = require("../controller/spotsController/getSpot");
const updateSpot = require("../controller/spotsController/updateSpot");
const deleteSpot = require("../controller/spotsController/deleteSpot");

router.get("/signup", signUp.getSignUp);
router.get("/signin", signin.getSignIn);
router.get("/", index.getIndex);
router.get("/profil", myProfile.getMyProfile);
router.post("/signin", postSignin.postSignIn);
router.post("/signup", postSignUp.postSignUp);
router.get("/filActualite", filActualite.getfilActualite);
router.get("/create", getCreateSpot.getCreateSpot);
router.post("/create", createSpot.createSpot);
router.get("/spot/:id", getSpot.getSpot);
router.put("/spot/:id", updateSpot.updateSpot);
router.delete("/delete/:id", deleteSpot.deleteSpot);
router.get("/users/search/:query", searchFriends.getFriends);
router.post("/friend/:id", addFriends.addFriends);
router.get("/friend/:id", addFriends.addFriends);
router.get("/user/:id", otherUserProfile.getOtherUserProfile);
router.delete("/unfriend/:id", deleteFriend.deleteFriend);
router.get("/unfriend/:id", deleteFriend.deleteFriend);

module.exports = router; 