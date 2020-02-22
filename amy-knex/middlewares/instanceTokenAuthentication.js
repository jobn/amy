const db = require("../db.js");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw "Missing token!";
    }

    const instance = await db("instances")
      .where("token", token)
      .first("id", "name");

    if (!instance) {
      throw "Invalid token";
    } else {
      res.locals.instance = instance;
      next();
    }
  } catch {
    res.status(401).json({
      error: "Invalid token!"
    });
  }
};
