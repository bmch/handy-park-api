const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }
  if (!payload) {
    const error = new Error('not authorized');
    error.statusCode = 400;
    throw error;
  }
  return payload;
};
