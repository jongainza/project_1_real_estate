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
        `SELECT user_id as id,password,email,photo FROM users WHERE username = $1`,
        [username]
      );
      const { password, id, photo, email } = result.rows[0];

      return { password, id, photo, email, username };
    } catch (e) {
      throw new ExpressError("User/Password no found");
    }
  }

  static async updateUser(id, newData) {
    try {
      const { username, email, password, photo } = newData;

      let query = `UPDATE users 
                 SET username = $1,
                     email = $2,
                     photo = $3,
                     updated_date = CURRENT_TIMESTAMP`;

      const queryParams = [username, email, photo];

      // Conditionally add password update to the query
      if (password !== undefined) {
        query += ", password = $4";
        queryParams.push(password);
      }

      query += ` WHERE user_id = $${queryParams.length + 1}
               RETURNING user_id as id, username, email, photo`;

      const response = await db.query(query, [...queryParams, id]);

      if (!response.rows.length) {
        throw new ExpressError(`User with ID ${id} not found`, 404);
      }

      const updatedUser = response.rows[0];

      return {
        data: "success",
        updatedUser,
      };
    } catch (err) {
      throw new Error(`Error updating user information: ${err.message}`);
    }
  }
  static async deleteUser(id) {
    try {
      const results = await db.query(`DELETE FROM users WHERE user_id=$1`, [
        id,
      ]);
      return;
    } catch (e) {
      throw new ExpressError("Error deleting user");
    }
  }
}
module.exports = User;
