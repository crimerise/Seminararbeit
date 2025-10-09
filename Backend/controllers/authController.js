const authService = require('../services/authService');

async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const result = await authService.loginUserByEmail(email, password);
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    return res.json({ accessToken: result.accessToken, refreshToken: result.refreshToken, user: { user_id: result.user.user_id, name: result.user.name, email: result.user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name,email,password required' });
    const created = await authService.registerUser(name, email, password);  // hieer ein Fehler!!
    return res.status(201).json({ success: true, user: created });
  } catch (err) {
    if (err.message === 'email_taken') return res.status(409).json({ error: 'email already in use' });
    return res.status(500).json({ error: 'internal_error' });
  }
}

async function refresh(req, res) {
  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
  try {
    const result = await authService.useRefreshToken(refreshToken);
    return res.json(result);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}


async function logout(req, res) {
  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
  try {
    await authService.removeRefreshToken(refreshToken);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { login, refresh, logout, register };
