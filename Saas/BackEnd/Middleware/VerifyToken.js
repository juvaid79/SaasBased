const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  try {

    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    const verifyToken = jwt.verify(token, "SecretKey");

    if (verifyToken) {
      req.user = verifyToken.token;
      next();
    } else {
      return res.status(403).json({ msg: "Unauthorized user!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: error });
  }
};

module.exports = verifyToken;