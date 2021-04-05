const utils = require("../utils/index.js");
const R1getHandler = (req,res) => {
const refN1 = utils.makeApiCall('https://www.typeyoururl.com', 'get');
const refN2 = utils.makeMapperCall([], 'console.log("Hello World")');
const refN3 = utils.makeApiCall('https://www.typeyoururl.com', 'get');
res.status(200).send(refN2)};
module.exports = {R1getHandler, };