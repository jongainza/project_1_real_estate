const ExpressError = require("../expressError");
const Bid = require("../models/bid.model");

const createBid = async (req, res, next) => {
  try {
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
const getBids = async (req, res, next) => {
  const property_id = parseInt(req.params.property_id, 10);
  try {
    const bid = await Bid.getBids(property_id);

    return res.status(201).json({ data: bid });
  } catch (error) {
    return next(error);
  }
};
const getBid = async (req, res, next) => {
  try {
    let { bid_id } = req.params;
    bid_id = parseInt(bid_id);
    const result = await Bid.getBid(bid_id);
    return res.json({ bid: result });
  } catch (err) {
    return next(err);
  }
};
const deleteBid = async (req, res, next) => {
  const bid = await Bid.getBid(parseInt(req.params.bid_id));
  if (!bid) {
    return next(new ExpressError("Bid not found", 404));
  }
  if (req.user.id !== bid.bid.user_id) {
    console.log(req.user.id);
    return next(new ExpressError("Unhautorized to delete this bid", 401));
  }

  try {
    await Bid.deleteBid(parseInt(req.params.bid_id));
    return res.status(204).json({ message: "Bid deleted sucesfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = { createBid, getBids, getBid, deleteBid };
