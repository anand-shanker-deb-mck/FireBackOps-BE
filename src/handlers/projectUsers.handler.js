const projectUsers = require('../service/projectUsers.service');

const getUserNames = (async (req, res) => {
  const { id } = req.params;
  try {
    const userNames = await projectUsers.getUserNamesService(id);
    res.status(200).json({ data: userNames });
  } catch (error) {
    if (error.message === 'Project not found') { res.status(400).json({ message: error.message }); } else { res.status(500).json({ message: 'Internal server error' }); }
  }
});

module.exports = { getUserNames };
