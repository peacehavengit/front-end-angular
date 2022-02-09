// Configuration for jwt token to secure path

const jwt = require('express-jwt');

const secret = "JWTSECRET";
const userProperty = "payload";

module.exports = auth = jwt({
  secret: secret,
  userProperty: userProperty,
  algorithms: ["HS256"]
});