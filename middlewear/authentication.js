const { verifyToken } = require('../utils/authToken');
const User = require('../models/user');

const getAuthTokenFromRequest = (req) => {
  const header = req.get('Authorization') || '';
  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};

module.exports = async (req, _res, next) => {
  const token = getAuthTokenFromRequest(req);
  if (!token) {
    throw new Error('Authentication token not found.');
  }
  const userId = verifyToken(token).userId;
  if (!userId) {
    throw new Error('Authentication token is invalid.');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Authentication token is invalid: User not found.');
  }
  req.currentUser = user;
  next();
};
