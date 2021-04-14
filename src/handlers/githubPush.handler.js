/* eslint-disable consistent-return */
const githubPushService = require('../service/githubPush.service');
const service = require('../services/generate.service');

const githubPushHandler = async (req, res) => {
  const { body } = req;
  const { username } = req.user;
  try {
    await service.generateCodeService(
      body.projectId,
    );
    await githubPushService.githubPush(body, username);
    res.status(200).json('Project got committed successfully on Github');
  } catch (err) {
    if (
      err.message === 'Repository not found'
    ) {
      return res.status(500).json({ message: err.message });
    }
    if (err.message.substring(0, 6) === 'ENOENT') {
      return res.status(500).json({ message: 'Internal project build error' });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { githubPushHandler };
