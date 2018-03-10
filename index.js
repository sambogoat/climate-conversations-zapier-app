const Taxonomy = require('./resources/taxonomy');
const Transaction = require('./resources/transaction');
const Email_Activity = require('./resources/email_activity');
const Person = require('./resources/person');
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
    [Taxonomy.key]: Taxonomy,
    [Transaction.key]: Transaction,
    [Email_Activity.key]: Email_Activity,
    [Person.key]: Person,
  }
};

module.exports = App;
