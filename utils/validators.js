// utils/validators.js
const { reviewSchema, listingSchema } = require("../schema.js");
const ExpressError = require("./ExpressError.js");

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(400, errMsg));
    }
    next();
};

module.exports = { validateReview, validateListing };
