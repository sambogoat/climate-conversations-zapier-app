// get a single taxonomy
const getTaxonomy = (z, bundle) => {
  const responsePromise = z.request({
    url: `https://jsonplaceholder.typicode.com/posts/${bundle.inputData.id}`,
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// TODO - select only required fields.

// get a list of taxonomies
const listTaxonomies= (z) => {
  const responsePromise = z.request({
    url: 'https://api.kepla.com/v1/taxonomies',
    params: {
      taxonomy: 'activity'
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// find a particular taxonomy by name
const searchTaxonomies = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      query: `name:${bundle.inputData.name}`
    }
  });
  return responsePromise
    .then(response => z.JSON.parse(response.content));
};

// create a taxonomy
const createTaxonomy = (z, bundle) => {
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
  key: 'taxonomy',
  noun: 'Taxonomy',

  // get: {
  //   display: {
  //     label: 'Get Taxonomy',
  //     description: 'Gets a taxonomy.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'id', required: true}
  //     ],
  //     perform: getTaxonomy
  //   }
  // },

  list: {
    display: {
      label: 'New Taxonomy',
      description: 'Lists the taxonomies.'
    },
    operation: {
      perform: listTaxonomies,
      sample: {
        'id': '3195f9fb-0abb-4d34-b009-2198fcbac76f',
        'name': 'Email',
        'taxonomy': 'activity'
      },
      outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'name', label: 'Name'},
        {key: 'taxonomy', label: 'Taxonomy'}
      ]
    }
  // },

  // search: {
  //   display: {
  //     label: 'Find Taxonomy',
  //     description: 'Finds a taxonomy by searching.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: searchTaxonomies
  //   },
  // },

  // create: {
  //   display: {
  //     label: 'Create Taxonomy',
  //     description: 'Creates a new taxonomy.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: createTaxonomy
  //   },
  }
};
