const utils = require("../utils/index.js");

const R2postHandler = (req, res) => {
  try{
    const refN1 = utils.makeApiCall('https://www.typeyoururl.com', 'get');
    res.status(200).json({ message: refN1 });
  }catch(error){
    res.status(500).json({ message: error });
  }
};

module.exports = { R2postHandler };