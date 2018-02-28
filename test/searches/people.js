const should = require('should');

const zapier = require('zapier-platform-core');

const nock = require('nock');

const App = require('../../index');

const appTester = zapier.createAppTester(App);

describe('Search People Records', () => {

  it('should find a person by email address', (done) => {

    nock('https://api.kepla.com/v1/types/7c12b42d-26eb-43c7-a3d1-25045869cbf6')
      .get('/search')
      .query({
          q: 'primaryKey:"bob.smith@gmail.com"',
          typeId: 'c12b42d-26eb-43c7-a3d1-25045869cbf6'
        }).reply(200, {
              "records": [
                {
                  "B1MpdHgCkb": "Smith",
                  "By2E4yiM-": "",
                  "By9-2gA1-": "I feel climate change is *the* major issue facing both current and future generations.",
                  "H1hBN6cGb": "Core",
                  "HkBnYFeDz": "",
                  "Hy-auBlRJZ": "Bob",
                  "Hy5iBgCkb": "bob.smith@gmail.com",
                  "S1zVma5f-": "Core",
                  "SJB_5QsoZ": "Core Core I feel climate change is *the* major issue facing both current and future generations.",
                  "activities": [
                    {
                      "accountId": "db45570f-6f24-4118-9619-656a43a1815c",
                      "createdAt": "2017-05-24T08:54:30.189Z",
                      "date": "2017-01-06T00:00:00.000Z",
                      "id": "d9e505c7-2159-4c61-9a36-6fee0d2c18c7",
                      "meta": {
                        "name": "Focus Group Volunteer"
                      },
                      "pin": false,
                      "recordId": [
                        "b2d7e3d1-ee42-43d0-849d-61199d09f7d6"
                      ],
                      "taxonomyId": "3df10cd1-5df8-4d45-8a1d-c9d6a0ffa7c7",
                      "typeId": "7c12b42d-26eb-43c7-a3d1-25045869cbf6",
                      "updatedAt": "2017-05-24T08:54:25.576Z",
                      "userId": "8c81f39d-d2b6-4ae6-a3c9-0b538d871746"
                    }],
                  "createdAt": "2017-01-06T00:00:00.000Z",
                  "external": [],
                  "id": "a2d7e3d1-ee02-42d0-809d-61699d09f7d6",
                  "mailchimp": "",
                  "meta": {
                    "communications": {
                      "Hy5iBgCkb": true,
                      "rkchXl0yZ": true
                    },
                    "activities": [
                      {
                        "count": 1,
                        "taxonomyId": "3df10cd1-5df8-4d45-8a1d-c9d6a0ffa7c7"
                      }
                    ],
                    "transactions": {
                      "totalRevenue": 30,
                      "totalFees": 1.3,
                      "totalShipping": 0,
                      "totalTax": 0,
                      "count": 1,
                      "averageRevenue": 30,
                      "averagePeriodInDays": 0,
                      "retentionInDays": 0,
                      "totalTransactionPeriodInDays": 0,
                      "totalBySource": {
                        "raisely": 30
                      },
                      "totalByCampaign": {
                        "climateconversations": 30
                      },
                      "totalByFund": {
                        "7c1d143a-3115-4536-9fbd-00bffff59b761": 30
                      }
                    },
                    "regionCount": 0
                  },
                  "primaryKey": "bob.smith@gmail.com",
                  "r1ygFmisW": "2000-01-01T16:00:00.000Z",
                  "rJcZ_mjsW": "Male",
                  "relationships": [],
                  "rk7wjacf-": "Focus Group Host Signup",
                  "rkchXl0yZ": "90113015",
                  "rkdRreA1W": "",
                  "subscriptions": [],
                  "tags": [],
                  "teams": [],
                  "transactions": [
                    {
                      "accountId": "ff45570d-6f54-4478-9919-656a17f6815c",
                      "campaign": "climateconversations",
                      "createdAt": "2017-12-08T10:07:15.066Z",
                      "currency": "SGD",
                      "date": "2017-11-20T22:04:35.099Z",
                      "fees": 1.3,
                      "fundId": "7c1d641d-3167-4510-9bce-00beee59b777",
                      "id": "e337c2ee-c9ee-4g41-94e3-fad3dca9ee55",
                      "recordId": "a2d7e3d1-ee02-42d0-809d-61699d09f7d6",
                      "revenue": 30,
                      "shipping": 0,
                      "source": "raisely",
                      "status": "succeeded",
                      "subscriptionId": null,
                      "tax": 0,
                      "transactionId": "cb3a2890-ce3e-11e7-92bf-4b3a42fa5335",
                      "updatedAt": "2017-12-08T10:07:15.066Z"
                    }
                  ],
                  "typeId": "7c12b42d-26eb-43c7-a3d1-25045869cbf6",
                  "updatedAt": "2018-02-26T22:24:01.031Z",
                  "users": [],
                  "display": {
                    "title": "Bob Smith",
                    "subtitle": "90113015 bob.smith@gmail.com"
                  }
                }
              ],
              "total": 1,
              "options": {
                "limit": 50,
                "offset": 0
              }
        });

    const bundle = {
      inputData: {
        email: 'bob.smith@gmail.com'
      }
    };

    appTester(App.searches.people.operation.perform, bundle)
      .then(results => {
        results.length.should.be.equal(1);
        results[0].records.length.should.be.equal(1);
        const person = results[0].records[0];
        person.primaryKey.should.eql('bob.smith@gmail.com');
        person.id.should.eql('a2d7e3d1-ee02-42d0-809d-61699d09f7d6');
        done();
      })
      .catch(done);
  });
});
