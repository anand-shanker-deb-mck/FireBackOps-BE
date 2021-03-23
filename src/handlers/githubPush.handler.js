const githubPushService = require('../service/githubPush.service');

const githubPushHandler = async (req, res) => {
  const { body } = req;
  const { username } = req.user;
  try {
    await githubPushService.githubPush(body, username);
    res.status(200).send('Files committed successfully');
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = { githubPushHandler };
