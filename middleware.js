// const Listing = require("./models/listing");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema } = require("./schema.js");



// module.exports.isLoggedIn = (req, res, next) => {

//     if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "you must be logged in create listing!");
//         return res.redirect("/login");
//     }
//     next();
// };

// module.exports.saveRedirectUrl = (req, res, next) => {
//     if (req.session.redirectUrl) {
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//     next();
// };


// module.exports.isOwner = async (req, res) => {
//     const { id } = req.params;
// let listing = await Listing.findById(id);
// if(!listing.owner.equals(res.locals.currUser._id)) {
//     req.flash("error", "You are not owner of this listing");
//     return res.redirect(`/listings/${id}`);
// }
// next();
// };

// // Middleware to validate listing data
// module.exports. validateListing = (req, res, next) => {
//     console.log(req.body); // Log the request body to check its structure
//     const { error } = listingSchema.validate(req.body);
    
//     if (error) {
//         const errMsg = error.details.map((el) => el.message).join(', ');
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };



const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./schema.js");

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
};

// Middleware to save redirect URL if it exists in the session
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if the user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware to validate listing data
module.exports.validateListing = (req, res, next) => {
    console.log(req.body); // Log the request body to check its structure
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let {id,reviewId } = req.params;
    let  review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};