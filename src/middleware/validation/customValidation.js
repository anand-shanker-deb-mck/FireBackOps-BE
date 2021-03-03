const APICOMPONENT = 'API';
const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
const HEADERS = ['Content-Type', 'Content-Length', 'Host', 'User-Agent'];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

const payloadValidation = (content) => {
  const { payload } = content;
  if (content.type === APICOMPONENT) {
    if (payload.method && payload.url) {
      const methodValid = METHODS.includes(payload.method);
      // check if method is either GET,POST,PUT or DELETE
      const urlValid = isValidHttpUrl(payload.url);
      // check if  url is  valid
      console.log(methodValid, urlValid);
    }
    if (payload.headers) {
      const keys = Object.keys(payload.headers);
      const checker = keys.every((header) => HEADERS.includes(header));
      //  check if headers are valid
      console.log(checker);
    }
    if (payload.body && (payload.method !== 'POST' || payload.method !== 'PUT')) {
      throw new Error();
    }
  }
};

module.exports = { payloadValidation };
