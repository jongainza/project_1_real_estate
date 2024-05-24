const ExpressError = require("../expressError");
const Bid = require("../models/bid.model");

const createBid = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request params:", req.params);
    console.log("Authenticated user:", req.user);

    const { amount, user_id } = req.body;
    const property_id = req.params.id;
    if (user_id !== req.user.id) {
      let err = new ExpressError(
        "No allowed to submit an offer at this time",
        400
      );
      return next(err);
    }
    const propertyIdInt = parseInt(property_id, 10);
    if (isNaN(propertyIdInt)) {
      let err = new ExpressError("Invalid property ID", 400);
      return next(err);
    }
    console.log({ property_id });
    const bid = await Bid.create({
      amount,
      user_id,
      property_id: propertyIdInt,
    });

    return res.status(201).json({ data: bid });
  } catch (error) {
    return next(error);
  }
};
module.exports = { createBid };
