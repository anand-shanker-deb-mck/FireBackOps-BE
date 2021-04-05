const utils = require("../utils/index.js");

const R1getHandler = (req, res) => {
  try{ 
    const { body, params } = req;    const refN2 = utils.makeMapperCall([refN1], 'console.log("Hello World")');
    res.status(200).json({ message: refN2 });
  }catch(error){
    res.status(500).json({ message: error });
  }
};

const R1postHandler = (req, res) => {
  try{ 
    const { body, params } = req;    const refN3 = utils.makeApiCall('https://www.typeyoururl.com', 'get');
    res.status(200).json({ message: refN3 });
  }catch(error){
    res.status(500).json({ message: error });
  }
};

module.exports = { R1getHandler, R1postHandler };