const express = require("express");

const router = express.Router();

const SignUp = require("../controller/SignUp");
const signin = require("../controller/Signin");
const index = require("../controller/index");
const profil = require("../controller/profil");
const postSignin = require("../controller/postSignin");
const postSignUp = require("../controller/postSignUp");
const filActualite = require("../controller/filActualite");
const create = require("../controller/create");
const createpost = require("../controller/createpost");
const details = require("../controller/details");
const Update = require("../controller/update");
const Delete = require("../controller/delete");
const amis = require("../controller/amis"); 
const ajoutAmis = require("../controller/ajoutAmis");
const profilAmi = require("../controller/profilAmi");

//const homeController = require("../controller/homeController");

router.get("/signup", SignUp.getSignUp);

router.get("/signin", signin.getSignIn);

router.get("/", index.getIndex);

router.get("/profil", profil.getProfil);

router.post("/signin", postSignin.postSignIn);

router.post("/signup", postSignUp.postSignUp);

router.get("/filActualite", filActualite.getfilActualite);

router.get("/create", create.create);

router.post("/create", createpost.createpost);

router.get("/details/:id", details.details);

router.put("/details/:id", Update.Update);

router.delete("/delete/:id", Delete.delete);

router.get("/users/search/:query", amis.getAmis);

router.post("/friend/:id", ajoutAmis.ajouter);

router.get("/user/:id", profilAmi.getProfilAmi);

module.exports = router; 