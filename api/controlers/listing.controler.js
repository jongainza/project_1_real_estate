const ExpressError = require("../expressError");
const Listing = require("../models/listing.model");
const Image = require("../models/image.model");
const jsonschema = require("jsonschema");
const createListingSchema = require("../schemas/listing/createListing.schema.json");

const create = async (req, res, next) => {
  try {
    // Destructure relevant data from the request body
    const {
      title,
      info,
      street,
      number,
      city,
      state,
      country,
      zip_code,
      price,
      bedrooms,
      bathrooms,
      garage,
      images,
    } = req.body;
    const { id } = req.user;
    // Validate request body against JSON schema
    const result = jsonschema.validate(req.body, createListingSchema);
    if (!result.valid) {
      let listOfErrors = result.errors.map((error) => error.stack);
      let err = new ExpressError(listOfErrors, 400);
      return next(err);
    }
    console.log(req.body);
    const listing = await Listing.create(id, {
      title,
      info,
      street,
      number,
      city,
      state,
      country,
      zip_code,
      price,
      bedrooms,
      bathrooms,
      garage,
      images, // Pass images array to the model method
    });

    return res.status(201).json({ data: listing });
  } catch (error) {
    return next(error);
  }
};
// get the listings of a user
const get = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) throw new ExpressError("loggin required", 400);

    const results = await Listing.get(id);
    return res.status(200).json({ data: results.rows });
  } catch (e) {
    return next(e);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findListing(req.params.id);
  if (!listing) {
    return next(new ExpressError("listing not found", 404));
  }
  if (req.user.id !== listing.user_id) {
    return next(new ExpressError("Unable to delete this listing", 401));
  }

  try {
    await Listing.deleteListing(req.params.id);
    return res.status(204).json({ message: "Listing deleted sucesfully" });
  } catch (e) {
    next(error);
  }
};
const updateListing = async (req, res, next) => {
  const listingId = req.params.id;
  const updatedFields = req.body;
  const listing = await Listing.findListing(listingId);
  // console.log({ listing });
  //   console.log({ reqUser: req.user.id });
  if (!listing) {
    return next(new ExpressError("listing not found", 404));
  }
  if (req.user.id !== listing.user_id) {
    return next(new ExpressError("not authorized to modify this listing", 401));
  }
  try {
    // Check if updatedFields includes images
    if (updatedFields.images) {
      const images = updatedFields.images;
      // Iterate over the images array and insert each image into the images table
      for (const imageUrl of images) {
        await Image.insertImage(listingId, imageUrl); // You need to implement this method in your Listing model
      }
      // Remove images from updatedFields since they've been processed separately
      delete updatedFields.images;
    }
    // Update the remaining fields in the property table
    delete updatedFields._token;
    const updatedListing = await Listing.updateListing(
      listingId,
      updatedFields
    );
    res.status(200).json(updatedListing);
  } catch (e) {
    next(e);
  }
};
const findListing = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Listing.findListing(id);
    // let listing = result.rows[0];
    // console.log({ listing });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
const getListings = async (req, res, next) => {
  try {
    const result = await Listing.getListings();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  get,
  deleteListing,
  updateListing,
  findListing,
  getListings,
};
