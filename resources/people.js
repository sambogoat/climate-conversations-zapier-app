// get a single person
const getPeople = (z, bundle) => {
  const responsePromise = z.request({
    url: `https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}`,
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// get a list of people
const listPeoples = (z) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      order_by: 'id desc'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// find a particular person by email address
const searchPeople = (z, bundle) => {
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
        const json = z.JSON.parse(response.content).records[0];
        return [{ "id": json.id, "createdAt": json.createdAt, "primaryKey": json.primaryKey }];
    });
};

// create a person
const createPeople = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: {
      name: bundle.inputData.name // json by default
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'people',
  noun: 'People',

  get: {
    display: {
      label: 'Get People',
      description: 'Gets a people.'
    },
    operation: {
      inputFields: [
        {key: 'id', required: true}
      ],
      perform: getPeople
    }
  },

  list: {
    display: {
      label: 'New People',
      description: 'Lists the peoples.'
    },
    operation: {
      perform: listPeoples
    }
  },

  search: {
    display: {
      label: 'Find a Person',
      description: 'Finds a Person by Email Address.'
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
      perform: searchPeople,
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
    },
  },

  create: {
    display: {
      label: 'Create People',
      description: 'Creates a new people.'
    },
    operation: {
      inputFields: [
        {key: 'name', required: true}
      ],
      perform: createPeople
    },
  },

  sample: {
    id: 1,
    name: 'Test'
  },

  outputFields: [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'}
  ]
};
