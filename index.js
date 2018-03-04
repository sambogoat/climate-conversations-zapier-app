const People = require('./resources/people');
const EmailActivityCreate = require('./creates/email_activity');
const Authentication = require('./authentication');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

const includeApiKeyHeader = (request, z, bundle) => {
  if (bundle.authData.apiKey) {
    request.headers.authorization = bundle.authData.apiKey;
  }
  return request;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: Authentication,

  beforeRequest: [
    includeApiKeyHeader
  ],

  afterResponse: [
    handleHTTPError
  ],

  resources: {
    [People.key]: People,
  },

  triggers: {
  },

  searches: {
  },

  creates: {
    [EmailActivityCreate.key]: EmailActivityCreate,
  }
};

module.exports = App;
