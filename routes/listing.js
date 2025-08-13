const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

const listingController = require("../controllers/listings.js")


router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image][url]'), validateListing, wrapAsync(listingController.createpost))

// .post(upload.single('listing[image][url]'), (req, res) => {
//     res.send(req.file);
// });

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
.get(wrapAsync( listingController.showListing))
.put(isLoggedIn, isOwner,  validateListing, wrapAsync(listingController.updateroutes ))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deletes));


//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync( listingController.editroutes ));




module.exports = router;