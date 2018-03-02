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
        .then(response => {
            // TODO - validations
            const obj = z.JSON.parse(response.content).records[0];
            const resp = { "id": obj.id, "createdAt": obj.createdAt, "primaryKey": obj.primaryKey };
            z.console.log("Person Search Response", resp);
            return [resp];
        });
    },

    sample: {
      "id": "d9e505c7-2159-4c61-9a36-6fee0d2c18c7",
      "createdAt": "2017-05-24T08:54:30.189Z",
      "primaryKey": "bob.smith@gmail.com"
    },

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'createdAt', label: 'Created At'},
      {key: 'primaryKey', label: 'Email Address'}
    ]
  }
};
