const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

async function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.getUserById(payload.sub);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // optional: check password_changed_at
    if (user.password_changed_at) {
      const tokenIatMs = payload.iat * 1000;
      if (tokenIatMs < new Date(user.password_changed_at).getTime()) {
        return res.status(401).json({ error: 'Token revoked' });
      }
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { authenticate };
