// get a single email activity
const getEmailActivity = (z, bundle) => {
  const responsePromise = z.request({
    url: `https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}`,
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// get a list of email activities
const listEmailActivities = (z) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      order_by: 'id desc'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// find a particular email activity by id
const searchEmailActivities = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      query: `name:${bundle.inputData.name}`
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// create an email activity
const createEmailActivity = (z, bundle) => {

  const createActivityBody = (inputData) => { 
    const body = {
      'recordId': inputData.recordId,
      'taxonomyId': 'c3dbf9c7-efc4-43ca-83e8-5b4470e58d72',
      'comment': inputData.message,
      'date': null,
      'meta': {
        'subject': inputData.subject
      }
    };
    return body;
  }

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
      const json = z.JSON.parse(response.content);
      return { 'id': json.id, 'comment': json.comment, 'recordId': json.recordId, 'meta': json.meta };
    });
};

module.exports = {
  key: 'email_activity',
  noun: 'Email Activity',

  // get: {
  //   display: {
  //     label: 'Get an Email Activity',
  //     description: 'Gets a email activity.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'id', required: true}
  //     ],
  //     perform: getEmailActivity
  //   }
  // },

  // list: {
  //   display: {
  //     label: 'New Activities',
  //     description: 'Lists email activities.'
  //   },
  //   operation: {
  //     perform: listEmailActivities
  //   }
  // },

  // search: {
  //   display: {
  //     label: 'Find an Email Activity',
  //     description: 'Finds an email activity by id.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: searchEmailActivities
  //   },
  // },

  create: {
    display: {
      label: 'Create an Email Activity',
      description: 'Creates a new email activity.'
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
      perform: createEmailActivity,

      sample: {
        'id': '439b5d4f-e1a8-4546-87da-0bf4cb6ca848'
      },

      outputFields: [
        {key: 'id', label: 'ID'}
      ]
    }
  }
};
