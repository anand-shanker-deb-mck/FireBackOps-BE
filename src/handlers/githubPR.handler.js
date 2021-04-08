const githubPushService = require('../service/githubPush.service');

const githubPRHandler = async (req, res) => {
  const { body } = req;
  const { username } = req.user;
  try {
    const response = await githubPushService.githubRaisePullRequest(body, username);
    res.status(200).json({ url: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { githubPRHandler };
