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

  z.console.log("Posting Email Activity", bundle.inputData, JSON.stringify(createActivityBody(bundle.inputData)));

  const responsePromise = z.request({
    method: 'POST',
    url: 'https://api.kepla.com/v1/activities',
    body: JSON.stringify(createActivityBody(bundle.inputData)),
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    }
  });
  return responsePromise
    .then(response => { 
      const o = z.JSON.parse(response.content);
      return { "id": o.id, "comment": o.comment, "recordId": o.recordId, "meta": o.meta };
    });
};

module.exports = {
  key: 'activity',
  noun: 'Email Activity',

  display: {
    label: 'Create Email Activity',
    description: 'Creates an email activity.'
  },

  operation: {

    inputFields: [
      {
        key: 'recordId',
        type: 'string',
        label: 'Person RecordId',
        helpText: 'The id of the Person to attach the email activity to.'
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
      "id": "439b5d4f-e1a8-4546-87da-0bf4cb6ca848"
    },

    outputFields: [
      {key: 'id', label: 'ID'}
    ]
  }
};
