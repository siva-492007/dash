const Dash = require('dash');

const clientOpts = {
  apps: {
    tutorialContract: {
      contractId: '53wiNXNx3Fepf7eQUAgywbkUPykVXVFbw5Z2HtkdBZMb',
    },
  },
};
const client = new Dash.Client(clientOpts);

const getDocuments = async () => {
  return client.platform.documents.get(
    'tutorialContract.note',
    {
      limit: 2, // Only retrieve 1 document
    },
  );
};

getDocuments()
  .then((d) => {
    for (const n of d) {
      console.log('Document(s):\n', n.toJSON());
    }
  })
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
