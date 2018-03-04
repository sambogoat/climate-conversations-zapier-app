const should = require('should');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);

describe('API Key Authentication', () => {

  it('has auth details added to every request', (done) => {
    const bundle = {
      authData: {
        apiKey: process.env.API_KEY
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