const db = require('../db');

async function getAllUsers() {
  const res = await db.query('SELECT user_id, name, email FROM users ORDER BY user_id');
  return res.rows;
}

async function getUserById(id) {
  const res = await db.query('SELECT user_id, name, email FROM users WHERE user_id = $1', [id]);
  return res.rows[0] || null;
}

async function getUserByEmail(email) {
  const res = await db.query('SELECT user_id, name, email, hashed_password, reset_token, reset_expires_at FROM users WHERE email = $1', [email]);
  return res.rows[0] || null;
}

async function getUserByResetToken(token) {
  const res = await db.query('SELECT user_id, name, email FROM users WHERE reset_token = $1 AND reset_expires_at > now()', [token]);
  return res.rows[0] || null;
}

async function setResetToken(userId, token, expiresAt, client) {
  const q = 'UPDATE users SET reset_token = $1, reset_expires_at = $2 WHERE user_id = $3';
  if (client) return client.query(q, [token, expiresAt, userId]);
  return db.query(q, [token, expiresAt, userId]);
}

async function updatePassword(id, hashedPassword, client) {
  const q = 'UPDATE users SET hashed_password = $1, reset_token = NULL, reset_expires_at = NULL, updated_at = now() WHERE user_id = $2';
  if (client) return client.query(q, [hashedPassword, id]);
  return db.query(q, [hashedPassword, id]);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByResetToken,
  setResetToken,
  updatePassword,
};
