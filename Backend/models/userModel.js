const db = require('../db');

async function getAllUsers() {
  const res = await db.query('SELECT id, name, email FROM users ORDER BY id');
  return res.rows;
}

async function getUserById(id) {
  const res = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return res.rows[0] || null;
}

module.exports = {
  getAllUsers,
  getUserById,
};
