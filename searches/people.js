// TODO - UUID Ids to const fields
// TODO - Verify usage and required values for operation.inputFields

module.exports = {
  key: 'people',

  noun: 'People',
  display: {
    label: 'Find a Person',
    description: 'Search for person by email address.'
  },

  operation: {
    inputFields: [
      {
        key: 'email',
        type: 'string',
        label: 'Email Address',
        helpText: 'Email address of the user.'
      }
    ],

    perform: (z, bundle) => {
      const url = 'https://api.kepla.com/v1/types/7c12b42d-26eb-43c7-a3d1-25045869cbf6/search';

      const options = {
        params: {
          q: 'primaryKey:"' + bundle.inputData.email + '"',
          typeId: 'c12b42d-26eb-43c7-a3d1-25045869cbf6'
        }
      };

      return z.request(url, options)
        .then(response => [JSON.parse(response.content)]);
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      "id": "d9e505c7-2159-4c61-9a36-6fee0d2c18c7",
      "createdAt": "2017-05-24T08:54:30.189Z",
      "primaryKey": "bob.smithw@gmail.com"
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'createdAt', label: 'Created At'},
      {key: 'primaryKey', label: 'Email Address'}
    ]
  }
};
