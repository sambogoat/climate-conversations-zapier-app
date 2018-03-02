const should = require('should');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);

describe('API Key Authhentication', () => {

  it('has auth details added to every request', (done) => {
    const bundle = {
      authData: {
        apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiZGI0NTU3MGQtNmY1NC00MTM4LTk2OTktNjU2YTQzYTY4MTVjIiwiaWF0IjoxNTE4NDc1NDgzfQ.2b12GOdRJ0so70y2OlrptSw8mq6fIWcGptPqBepYSYk'
      }
    };
    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.request.headers.should.containEql({'authorization': bundle.authData.apiKey});
        response.status.should.eql(200);
        done();
      })
      .catch(done);
  });

});