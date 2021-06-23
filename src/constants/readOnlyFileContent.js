const dockerFileContent = `
FROM node:lts

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
`;

const dockerIgnoreFileContent = `
node_modules
npm-debug.log
`;

module.exports = {
  dockerIgnoreFileContent,
  dockerFileContent,
};
