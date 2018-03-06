// get a single transaction
const getTransaction = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}',
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// get a list of transactions
const listTransactions = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://api.kepla.com/v1/transactions',
    params: {
      source: bundle.inputData.source
    }
  });
  return responsePromise
    .then(response => {
      const json = z.JSON.parse(response.content)
      return json.transactions;
    });
};

// find a particular transaction by name
const searchTransactions = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      query: `name:${bundle.inputData.name}`
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// create a transaction
const createTransaction = (z, bundle) => {
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
  key: 'transaction',
  noun: 'Transaction',

  // get: {
  //   display: {
  //     label: 'Get Transaction',
  //     description: 'Gets a transaction.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'id', required: true}
  //     ],
  //     perform: getTransaction
  //   }
  // },

  list: {
    display: {
      label: 'New Transaction',
      description: 'Lists the transactions.'
    },
    operation: {
      inputFields: [
        {key: 'source', required: true}
      ],
      perform: listTransactions,
      sample: {
          'campaign': 'climateconversations',
          'createdAt': '2017-12-08T10:07:15.066Z',
          'currency': 'SGD',
          'id': 'e537c2ee-c9db-4f21-94b5-fad3dca9ee59',
          'recordId': 'a2d7e3d1-ee02-42d0-809d-61699d09f7d6',
          'revenue': 30,
          'source': 'raisely',
          'status': 'succeeded',
          'updatedAt': '2017-12-08T10:07:15.066Z'
      },
      outputFields: [
        {key: 'campaign', label: 'Campaign'},
        {key: 'createdAt', label: 'CreatedAt'},
        {key: 'currency', label: 'Currency'},
        {key: 'id', label: 'ID'},
        {key: 'recordId', label: 'RecordId'},
        {key: 'revenue', label: 'Revenue'},
        {key: 'source', label: 'Source'},
        {key: 'status', label: 'Status'},
        {key: 'updatedAt', label: 'UpdatedAt'}
      ]
    }
  // },

  // search: {
  //   display: {
  //     label: 'Find Transaction',
  //     description: 'Finds a transaction by searching.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: searchTransactions
  //   }
  // },

  // create: {
  //   display: {
  //     label: 'Create Transaction',
  //     description: 'Creates a new transaction.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: createTransaction
  //   },
  }
};
