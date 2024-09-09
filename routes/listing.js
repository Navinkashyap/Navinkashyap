

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// Index Route - List all listings
router
    .route("/")
    .get(wrapAsync(listingController.index))          // List all listings
   .post(
    isLoggedIn,  
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));  // Create a new listing
   


// New Route - Form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update, and Delete Route for a specific listing
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))    // Show a specific listing
    .put(isLoggedIn, isOwner,
        upload.single("listing[image]"),
         validateListing,
         wrapAsync(listingController.updateListing))  // Update a specific listing
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));  // Delete a specific listing

// Edit Route - Form to edit a specific listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;


