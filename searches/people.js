module.exports = {
  key: 'people',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'People',
  display: {
    label: 'Find a Person',
    description: 'Search for person by email address.'
  },

  // `operation` is where we make the call to your API to do the search
  operation: {
    // This search only has one search field. Your searches might have just one, or many
    // search fields.
    inputFields: [
      {
        key: 'email',
        type: 'string',
        label: 'Email Address',
        helpText: 'Email address of the url.'
      }
    ],

    perform: (z, bundle) => {
      const url = 'https://api.kepla.com/v1/types/7c12b42d-26eb-43c7-a3d1-25045869cbf6/search';

      // Put the search value in a query param. The details of how to build
      // a search URL will depend on how your API works.
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
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
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
