const db = require("../db");
const ExpressError = require("../expressError");

class Listing {
  static async create(id, fields) {
    try {
      console.log({ id });
      console.log({ id, fields });
      const results = await db.query(
        `INSERT INTO property (title,info,street,number,city,state,country,zip_code,price,bedrooms,bathrooms,garage,user_id)  
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            RETURNING property_id ,user_id`,
        [
          fields.title,
          fields.info,
          fields.street,
          fields.number,
          fields.city,
          fields.state,
          fields.country,
          fields.zip_code,
          fields.price,
          fields.bedrooms,
          fields.bathrooms,
          fields.garage,
          id,
        ]
      );
      const listing = results.rows[0];

      const imageResults = await Promise.all(
        fields.images.map(async (image) => {
          const result = await db.query(
            `INSERT INTO images (property_id, image_url)  
         VALUES ($1, $2)
         RETURNING property_id, image_id`,
            [listing.property_id, image]
          );
          return result.rows[0]; // Assuming you want to return the first row
        })
      );

      return { listing, imageResults };
    } catch (e) {
      throw new ExpressError(`Error registering user:${e.message}`);
    }
  }
}
module.exports = Listing;
