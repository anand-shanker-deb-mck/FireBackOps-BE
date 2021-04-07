const prettier = require('prettier');
const { exec } = require('child_process');

const prettifyJsText = (JavaScriptText, parser = 'babel') => prettier.format(JavaScriptText, {
  semi: true, parser, arrowParens: 'avoid', trailingComma: 'all', jsxBracketSameLine: true, singleQuote: true,
});

const eslintFix = (projectName) => {
  exec(`npx eslint --autofix ${projectName}/src`);
};

module.exports = { prettifyJsText, eslintFix };
