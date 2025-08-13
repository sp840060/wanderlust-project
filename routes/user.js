const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users")

router.route("/signup")
.get(userController.rendersignup)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.loginform)
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true,}), userController.postform);


router.get("/logout", userController.logoutuser)

module.exports = router;