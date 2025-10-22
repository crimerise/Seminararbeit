const ActivityService = require('../services/activityService');

async function createType(req, res) {
  const { name, icon_url } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  try {
    const t = await ActivityService.createType(name, icon_url);
    return res.status(201).json(t);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
}

async function listTypes(req, res) {
  const types = await ActivityService.listTypes();
  return res.json({ data: types });
}

async function createPost(req, res) {
  const user = req.user;
  const body = req.body || {};
  const payload = Object.assign({}, body, { user_id: user.user_id });
  try {
    const post = await ActivityService.createPost(payload);
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
}

async function getPost(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'invalid id' });
  const post = await ActivityService.getPost(id);
  if (!post) return res.status(404).json({ error: 'not_found' });
  return res.json(post);
}

async function listPosts(req, res) {
  const posts = await ActivityService.listPosts();
  return res.json({ data: posts });
}

async function updatePost(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'invalid id' });
  try {
    const updated = await ActivityService.updatePost(id, req.user.user_id, req.body);
    return res.json(updated);
  } catch (err) {
    if (err.message === 'not_found') return res.status(404).json({ error: 'not_found' });
    if (err.message === 'forbidden') return res.status(403).json({ error: 'forbidden' });
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
}

async function deletePost(req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'invalid id' });
  try {
    const deleted = await ActivityService.deletePost(id, req.user.user_id);
    return res.json({ success: true, deleted });
  } catch (err) {
    if (err.message === 'not_found') return res.status(404).json({ error: 'not_found' });
    if (err.message === 'forbidden') return res.status(403).json({ error: 'forbidden' });
    console.error(err);
    return res.status(500).json({ error: 'server_error' });
  }
}

async function listPostsByUser(req, res) {
  const userId = parseInt(req.params.userId, 10);
  if (Number.isNaN(userId)) return res.status(400).json({ error: 'invalid id' });
  const posts = await ActivityService.listPostsByUser(userId);
  return res.json({ data: posts });
}

module.exports = {
  createType,
  listTypes,
  createPost,
  getPost,
  listPosts,
  updatePost,
  deletePost,
  listPostsByUser,
};
