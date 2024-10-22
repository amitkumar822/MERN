const jwt = require("jsonwebtoken");

const SECRET_KEY = "KDkdwi21b,zeRB@!$kmnzoTbDS90r4#^*ndWkdwi";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { getUserIdFromToken, generateToken };
