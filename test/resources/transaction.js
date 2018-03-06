/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Transaction Resource', () => {

  it('should list transactions', done => {

    const bundle = { 
    	inputData: { source: 'raisely' }
    	};

		nock('https://api.kepla.com/v1')
		  .get('/transactions')
		  .query({
		  	source: 'raisely'
		  }).reply(200, {
			  'total': 1,
			  'transactions': [
			    {
			      'accountId': 'db45570d-6f54-4138-9699-656a43a6815c',
			      'campaign': 'climateconversations',
			      'createdAt': '2017-12-08T10:07:15.066Z',
			      'currency': 'SGD',
			      'date': '2017-11-20T22:04:35.099Z',
			      'fees': 1.3,
			      'fund': {
			        'accountId': 'db45570d-6f54-4138-9699-656a43a6815c',
			        'id': '7c1d643a-3145-4526-9fae-00beee59b768',
			        'name': 'General',
			        'readonly': false,
			        'taxonomy': 'fund'
			      },
			      'fundId': '7c1d643a-3145-4526-9fae-00beee59b768',
			      'id': 'e537c2ee-c9db-4f21-94b5-fad3dca9ee59',
			      'recordId': 'a2d7e3d1-ee02-42d0-809d-61699d09f7d6',
			      'revenue': 30,
			      'shipping': 0,
			      'source': 'raisely',
			      'status': 'succeeded',
			      'subscriptionId': null,
			      'tax': 0,
			      'transactionId': 'cb3a2890-ce3e-11e7-92bf-4b3a42fa5335',
			      'updatedAt': '2017-12-08T10:07:15.066Z'
			    }
			  ],
			  'options': {
			    'limit': 50,
			    'offset': 0
			  }
			});

    appTester(App.resources.transaction.list.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        results.length.should.eql(1);
        const transaction = results[0];
        transaction.id.should.eql('e537c2ee-c9db-4f21-94b5-fad3dca9ee59');
        transaction.source.should.eql('raisely');
        transaction.revenue.should.eql(30);
        done();
      })
      .catch(done);
  });

});
