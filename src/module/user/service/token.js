const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, roles: user.roles, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
};

exports.createToken = createToken;