const db = require("../db");
const ExpressError = require("../expressError");

class Listing {
  static async create(id, fields) {
    try {
      // console.log({ id });
      // console.log({ id, fields });
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
  // gets all the listings from one user
  static async get(id) {
    try {
      const results = await db.query(
        `SELECT 
    p.property_id,
    p.title,
    p.info,
    p.street,
    p.number,
    p.city,
    p.state,
    p.country,
    p.zip_code,
    p.price,
    p.bedrooms,
    p.bathrooms,
    p.garage,
    ARRAY_AGG(i.image_url) AS image_urls
FROM 
    property p
JOIN 
    images i ON p.property_id = i.property_id
WHERE 
    p.user_id = $1
GROUP BY 
    p.property_id;`,
        [id]
      );
      console.log({ results });
      return results;
    } catch (e) {
      return e;
    }
  }
  //   // finds a listing by id
  //   static async findListing(id) {
  //     try {
  //       const results = await db.query(
  //         `SELECT
  //     p.user_id,
  //     p.title,
  //     p.info,
  //     p.street,
  //     p.number,
  //     p.city,
  //     p.state,
  //     p.country,
  //     p.zip_code,
  //     p.price,
  //     p.bedrooms,
  //     p.bathrooms,
  //     p.garage,
  //     i.image_url
  // FROM
  //     property p
  // JOIN
  //     images i ON p.property_id = i.property_id
  // WHERE
  //     p.property_id = $1`,
  //         [id]
  //       );
  //       console.log(id);
  //       // let response = results.rows[0];
  //       // console.log({ results: results.rows[0] });

  //       return results;
  //     } catch (e) {
  //       return e;
  //     }
  //   }
  // finds a listing by id
  static async findListing(id) {
    try {
      // Query for the property details
      const propertyResult = await db.query(
        `SELECT 
          p.property_id,
          p.user_id,
          p.title,
          p.info,
          p.street,
          p.number,
          p.city,
          p.state,
          p.country,
          p.zip_code,
          p.price,
          p.bedrooms,
          p.bathrooms,
          p.garage
       FROM 
          property p
       WHERE 
          p.property_id = $1`,
        [id]
      );
      // console.log({ propertyResult });
      // If no property is found, return an appropriate response
      if (propertyResult.rows.length === 0) {
        return { error: "Property not found" };
      }

      const property = propertyResult.rows[0];
      console.log({ property });

      // Query for the images
      const imagesResult = await db.query(
        `SELECT 
          i.image_url
       FROM 
          images i
       WHERE 
          i.property_id = $1`,
        [id]
      );
      console.log({ imagesResult });
      // Combine the property details and images
      const listing = {
        ...property,
        images: imagesResult.rows.map((row) => row.image_url),
      };
      console.log({ listing });
      return listing;
    } catch (e) {
      return e;
    }
  }

  static async deleteListing(id) {
    try {
      const results = await db.query(
        `DELETE FROM property WHERE property_id=$1`,
        [id]
      );
      console.log("listing deleted!");
      return;
    } catch (e) {
      throw new ExpressError("Error deleting user");
    }
  }
  static async updateListing(listingId, updatedFields) {
    try {
      console.log({ updatedFields });
      // Construct the SET clause dynamically based on updatedFields
      const setClause = Object.keys(updatedFields)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");

      // Prepare the values array for parameterized query
      const values = Object.values(updatedFields);
      values.push(listingId); // Add the listingId as the last parameter

      // Construct the SQL query dynamically
      const query = {
        text: `UPDATE property SET ${setClause} WHERE property_id = $${values.length}`,
        values,
      };

      // Execute the query
      const results = await db.query(query);

      console.log(`Listing with ID ${listingId} updated successfully`);
      return results.rows[0];
    } catch (error) {
      console.error(`Error updating listing with ID ${listingId}:`, error);
      throw new Error(`Error updating listing with ID ${listingId}`);
    }
  }
  static async getListings() {
    try {
      const results = await db.query(`
    SELECT 
        property.property_id,
        property.title,
        property.info,
        property.street,
        property.number,
        property.city,
        property.state,
        property.country,
        property.zip_code,
        property.price,
        property.bedrooms,
        property.bathrooms,
        property.garage,
        property.user_id,
        COALESCE(json_agg(images.image_url) FILTER (WHERE images.image_url IS NOT NULL), '[]') AS image_urls
    FROM 
        property
    LEFT JOIN 
        images ON property.property_id = images.property_id
    GROUP BY 
        property.property_id
    ORDER BY 
        property.property_id DESC;
  `);
      console.log({ results1: results.rows });
      return results;
    } catch (e) {
      console.error("error,executing query", e.stack);
      throw new Error("Error retrieving listings");
    }
  }
}

module.exports = Listing;
