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
        `SELECT user_id as id,password, photo FROM users WHERE username = $1`,
        [username]
      );
      const { password, id, photo } = result.rows[0];

      return { password, id, photo };
    } catch (e) {
      throw new ExpressError("User/Password no found");
    }
  }

  static async updateUser(id, newData) {
    try {
      const { username, email, password, photo } = newData;

      // Initialize arrays to store the SET clauses and parameter values
      const setClauses = [];
      const setValues = [];

      // Build the SET clause and parameter values based on the provided data
      if (username !== undefined) {
        setClauses.push(`username = $${setValues.length + 1}`);
        setValues.push(username);
      }
      if (email !== undefined) {
        setClauses.push(`email = $${setValues.length + 1}`);
        setValues.push(email);
      }
      if (password !== undefined) {
        setClauses.push(`password = $${setValues.length + 1}`);
        setValues.push(password);
      }
      if (photo !== undefined) {
        setClauses.push(`photo = $${setValues.length + 1}`);
        setValues.push(photo);
      }

      // Add the updated_date to the SET clause
      setClauses.push(`updated_date = current_timestamp`);

      // Construct the UPDATE query
      const updateQuery = `
      UPDATE users
      SET ${setClauses.join(", ")}
      WHERE user_id = $${setValues.length + 1}
      RETURNING user_id as id, username, email, photo
    `;

      // Add the user_id parameter value
      setValues.push(id);

      // Execute the query and return the updated user
      const updateResponse = await db.query(updateQuery, setValues);
      if (!updateResponse.rows[0]) {
        throw new ExpressError(`User with ID ${id} not found`, 404);
      }

      const updatedUser = updateResponse.rows[0];

      return {
        data: "success",
        updatedUser,
      };
    } catch (err) {
      throw new Error(`Error updating user information: ${err.message}`);
    }
  }
}
module.exports = User;
