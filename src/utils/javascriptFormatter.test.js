const prettier = require('prettier');
const { prettifyJsText } = require('./javaScriptFormatter');

describe('Prettify Javascript', () => {
  it('should return the formatted javascript', () => {
    const unformattedJavascript = 'const utils = require("../utils/index.js");const handler = (req,res) => {};';
    jest.spyOn(prettier, 'format').mockReturnValue('Returns the prettier javascript');
    const response = prettifyJsText(unformattedJavascript);
    expect(response).toEqual('Returns the prettier javascript');
  });
});
