const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { merge } = require("./listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")
 
// Review validation (middleware.js)



//Review Routes
//Post Route
router.post("/",  isLoggedIn, validateReview, wrapAsync(reviewController.CreateReview));

//Delete
router.delete("/:reviewId", isReviewAuthor, isLoggedIn, wrapAsync (reviewController.destroy));

module.exports = router;