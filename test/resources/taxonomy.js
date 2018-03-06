/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Taxonomy Resource', () => {

  it('should list activity taxonomies', done => {

    const bundle = { 
    	inputData: {}
    	};

		nock('https://api.kepla.com/v1')
		  .get('/taxonomies')
		  .query({
		  	taxonomy: 'activity'
		  }).reply(200, [
			  {
			    'accountId': 'db45570d-6f54-4138-9699-656a43a6815c',
			    'id': '089511f0-40b5-4fc4-8967-87543b78338a',
			    'meta': {
			      'ea4050ed91f43': {
			        'name': 'About',
			        'primary': false,
			        'type': 'text',
			        'visible': true
			      }
			    },
			    'name': 'Call',
			    'readonly': false,
			    'taxonomy': 'activity'
			  },
			  {
			    'accountId': 'db45570d-6f54-4138-9699-656a43a6815c',
			    'id': '5f2aefb0-1838-4f3c-b1be-4f9902e07998',
			    'meta': {
			      '2a63d71f0d4a3': {
			        'name': 'Location',
			        'primary': false,
			        'type': 'text',
			        'visible': true
			      },
			      'c32717cc73705': {
			        'name': 'Attendees',
			        'primary': false,
			        'recordType': '7c12b42d-26eb-43c7-a3d1-25045869cbf6',
			        'type': 'record',
			        'visible': true
			      }
			    },
			    'name': 'Meeting / Coffee',
			    'readonly': false,
			    'taxonomy': 'activity'
			  }
			]);

    appTester(App.resources.taxonomy.list.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        results.length.should.eql(2);
        results[0].name.should.eql('Call');
        results[1].name.should.eql('Meeting / Coffee');
        done();
      })
      .catch(done);
  });
});
