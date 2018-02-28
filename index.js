const ActivityCreate = require('./creates/activity');
const PeopleSearch = require('./searches/people');
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

// Now we can roll up all our behaviors in an App.
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
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    [PeopleSearch.key]: PeopleSearch
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [ActivityCreate.key]: ActivityCreate,
  }
};

// Finally, export the app.
module.exports = App;
