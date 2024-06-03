const db = require("../db");
const ExpressError = require("../expressError");

class Image {
  static async insertImage(listingId, imageUrl) {
    try {
      const results = await db.query(
        "INSERT INTO images (property_id, image_url) VALUES ($1, $2)",
        [listingId, imageUrl]
      );
      return;
    } catch (e) {
      throw new ExpressError("Error adding image");
    }
  }
  static async deleteImage(imageId) {
    try {
      const results = await db.query(`DELETE FROM image WHERE image_id=$1`, [
        imageId,
      ]);
      return;
    } catch (e) {
      throw new ExpressError("Error deleting image");
    }
  }
}
module.exports = Image;
