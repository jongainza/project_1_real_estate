const db = require("../db");
const ExpressError = require("../expressError");

class Bid {
  static async create({ amount, user_id, property_id }) {
    try {
      console.log({ 1: amount, 2: user_id, 3: property_id });

      const result = await db.query(
        `INSERT INTO bid (amount, bid_date, user_id, property_id)
            VALUES ($1, current_timestamp, $2, $3)
            RETURNING bid_id, amount, bid_date, user_id, property_id`,
        [amount, user_id, property_id]
      );
      console.log(result);
      const bid = result.rows[0];
      console.log({ bid });
      return { bid };
    } catch (e) {
      throw new ExpressError(`Error registering offer:${e.message}`);
    }
  }
  static async get(property_id) {
    try {
      console.log({ property_id });

      const result = await db.query(`SELECT * FROM bid WHERE property_id=$1`, [
        property_id,
      ]);
      console.log({ result });
      const bid = result.rows[0];
      console.log({ bid });
      return { bid };
    } catch (e) {
      throw new ExpressError(`Error registering offer:${e.message}`);
    }
  }
}
module.exports = Bid;
