// TODO - 'sample' should only be fields that are returned i think.

const createActivityBody = (inputData) => { 
  const body = {
    "recordId": inputData.recordId,
    "taxonomyId": "c3dbf9c7-efc4-43ca-83e8-5b4470e58d72",
    "comment": inputData.message,
    "date": null,
    "meta": {
      "subject": inputData.subject
    }
  };
  return body;
}

const createActivity = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://api.kepla.com/v1/activities',
    body: JSON.stringify(createActivityBody(bundle.inputData))
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'activity',
  noun: 'Activity',

  display: {
    label: 'Create Activity',
    description: 'Creates a activity.'
  },

  operation: {

    inputFields: [
      {
        key: 'recordId',
        type: 'string',
        label: 'recordId',
        helpText: 'The id of the Person to whom to attach the email activity.'
      },
      {
        key: 'message',
        type: 'string',
        label: 'Message',
        helpText: 'The email message.'
      },
      {
        key: 'subject',
        type: 'string',
        label: 'Subject',
        helpText: 'The email subject.'
      }
    ],

    perform: createActivity,

    sample: {
      "accountId": "714d5e0d-6ee4-4274-4193-656a37a6815c",
      "typeId": "7c12b42d-26eb-43c7-a3d1-25045869cbf6",
      "recordId": [
        "a2d7e3d1-ff02-42d0-4193-71695430912d6"
      ],
      "taxonomyId": "c3dbf9c7-efc4-43ca-83e8-5b4470e58d72",
      "userId": "api",
      "date": "2018-02-28T13:35:15+00:00",
      "comment": "a test message",
      "meta": {
        "subject": "test subject"
      },
      "pin": false,
      "createdAt": "2018-02-28T13:35:15.452Z",
      "updatedAt": "2018-02-28T13:35:39.269Z",
      "id": "439b5d4f-e1a8-4546-87da-0bf4cb6ca848"
    },

    outputFields: [
      {key: 'id', label: 'ID'}
    ]
  }
};
