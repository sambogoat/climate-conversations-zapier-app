// TODO - Rename file and test to email_activity
// TODO - API Urls to central place - Resources?

/* globals describe it */
const should = require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('Create Activity', () => {

  it('should create an email activity', done => {

    const bundle = { 
    	inputData: 
	    	{ 
	    		recordId: "a2d7e3d1-ee02-42d0-809d-61699d09f7d6", 
	    		message: "a test message", 
	    		subject: "a test subject"
	    	}
    	};

		nock('https://api.kepla.com/v1')
		  .post('/activities', {
				  "recordId": "a2d7e3d1-ee02-42d0-809d-61699d09f7d6",
				  "taxonomyId": "c3dbf9c7-efc4-43ca-83e8-5b4470e58d72",
				  "comment": "a test message",
				  "date": null,
				  "meta": {
				    "subject": "a test subject"
				  }
				}
			).reply(200, {
				  "accountId": "db45570d-6f54-4138-9699-656a43a6815c",
				  "typeId": "7c12b42d-26eb-43c7-a3d1-25045869cbf6",
				  "recordId": [
				    "a2d7e3d1-ee02-42d0-809d-61699d09f7d6"
				  ],
				  "taxonomyId": "c3dbf9c7-efc4-43ca-83e8-5b4470e58d72",
				  "userId": "api",
				  "date": "2018-02-27T22:01:26+00:00",
				  "comment": "a test message",
				  "meta": {
				    "subject": "a test subject"
				  },
				  "pin": false,
				  "createdAt": "2018-02-27T22:01:26.648Z",
				  "updatedAt": "2018-02-27T22:00:06.840Z",
				  "id": "f1bd23d7-731e-4c7d-bbf1-c2f0507b562c"
				}
			);

    appTester(App.creates.activity.operation.perform, bundle)
      .then(results => {
        should.exist(results);
        results.recordId[0].should.eql('a2d7e3d1-ee02-42d0-809d-61699d09f7d6');
        results.comment.should.eql('a test message');
        results.meta.subject.should.eql('a test subject');
        done();
      })
      .catch(done);
  });
});
