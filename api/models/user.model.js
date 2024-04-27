const db = require("../db");
const ExpressError = require("../expressError");
const { default_photo_url } = require("../config");

class User {
  static async register(username, email, hashedPassword, photo) {
    try {
      const results = await db.query(
        `INSERT INTO users (username, email, password,registration_date, photo  )
            VALUES ($1,$2,$3,current_timestamp,$4)
            RETURNING user_id as id,username,email, password,registration_date,photo`,
        [username, email, hashedPassword, photo]
      );
      const user = results.rows[0];
      return { user };
    } catch (e) {
      throw new ExpressError(`Error registering user:${e.message}`);
    }
  }
  static async getUser(username) {
    try {
      const result = await db.query(
        `SELECT user_id as id,password FROM users WHERE username = $1`,
        [username]
      );
      const { password, id } = result.rows[0];

      return { password, id };
    } catch (e) {
      throw new ExpressError("User/Password no found");
    }
  }
}
module.exports = User;
