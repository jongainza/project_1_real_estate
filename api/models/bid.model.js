const db = require("../db");
const ExpressError = require("../expressError");

class Bid {
  static async create({ amount, user_id, property_id }) {
    try {
      const result = await db.query(
        `INSERT INTO bid (amount, bid_date, user_id, property_id)
            VALUES ($1, current_timestamp, $2, $3)
            RETURNING bid_id, amount, bid_date, user_id, property_id`,
        [amount, user_id, property_id]
      );
      const bid = result.rows[0];
      return { bid };
    } catch (e) {
      throw new ExpressError(`Error registering offer:${e.message}`);
    }
  }
  static async getBids(property_id) {
    try {
      const result = await db.query(`SELECT * FROM bid WHERE property_id=$1`, [
        property_id,
      ]);
      const bid = result.rows;
      return { bid };
    } catch (e) {
      throw new ExpressError(`Error registering offer:${e.message}`);
    }
  }
  static async getBid(bid_id) {
    try {
      const result = await db.query("SELECT * FROM bid WHERE  bid_id = $1", [
        bid_id,
      ]);
      const bid = result.rows[0];
      return { bid };
    } catch (e) {
      throw new ExpressError(`Error getting bid`);
    }
  }
  static async deleteBid(id) {
    try {
      const results = await db.query(`DELETE FROM bid WHERE bid_id=$1`, [id]);
      return;
    } catch (e) {
      throw new ExpressError("Error deleting bid");
    }
  }
}
module.exports = Bid;
