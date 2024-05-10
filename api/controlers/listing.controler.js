const ExpressError = require("../expressError");
const Listing = require("../models/listing.model");
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
      images, // Assuming all image URLs are passed in an array
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
    // Ensure required fields are provided
    // const requiredFields = [
    //   title,
    //   street,
    //   number,
    //   city,
    //   state,
    //   country,
    //   zip_code,
    //   price,
    //   bedrooms,
    //   bathrooms,
    //   garage,
    // ];
    // if (requiredFields.some((field) => !field)) {
    //   throw new ExpressError("Missing required fields", 400);
    // }

    // Assuming Listing.create() method returns the newly created listing
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
const get = async (req, res, next) => {
  try {
    // const { id } = req.user;
    let id = 11;
    if (!id) throw new ExpressError("loggin required", 400);

    const results = await Listing.get(id);
    return res.status(200).json({ data: results.rows });
  } catch (e) {}
};

module.exports = { create, get };
