const should = require('should');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);

describe('searches', () => {

  describe('search people', () => {

    it('should find a person', (done) => {
      const bundle = {
        authData: {
          apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiZGI0NTU3MGQtNmY1NC00MTM4LTk2OTktNjU2YTQzYTY4MTVjIiwiaWF0IjoxNTE4NDc1NDgzfQ.2b12GOdRJ0so70y2OlrptSw8mq6fIWcGptPqBepYSYk'
        },
        inputData: {
          email: 'stephen.matthew@gmail.com'
        }
      };
      appTester(App.searches.people.operation.perform, bundle)
        .then(results => {
          results.length.should.be.equal(1);
          results[0].records.length.should.be.equal(1);
          const person = results[0].records[0];
          person.primaryKey.should.eql('stephen.matthew@gmail.com');
          person.id.should.eql('a2d7e3d1-ee02-42d0-809d-61699d09f7d6');
          done();
        })
        .catch(done);
    });
  });

});
