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
    res.status(200).send('Project got committed successfully on Github');
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = { githubPushHandler };
