const User = require('../models/userModel');
const userService = require('../services/userService');

async function listUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}

async function getUser(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, error: 'Invalid id' });
  }

  try {
    const user = await User.getUserById(id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}

async function requestPasswordReset(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, error: 'email required' });

  try {
    const result = await userService.requestPasswordReset(email);
    // For security, don't reveal if email exists. In demo return token if found.
    if (!result) return res.json({ success: true, message: 'If that email exists, a reset email was sent' });
    return res.json({ success: true, message: 'reset token generated (demo)', token: result.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ success: false, error: 'token and newPassword required' });

  try {
    const result = await userService.resetPassword(token, newPassword);
    if (!result.success) return res.status(400).json({ success: false, error: result.reason });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}

module.exports = {
  listUsers,
  getUser,
  requestPasswordReset,
  resetPassword,
};

