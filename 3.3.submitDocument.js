const Dash = require('dash');

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: 'cross gossip truth despair cinnamon pumpkin toast model spoon multiply isolate say',
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 500000, // only sync from mid-2021
    },
  },
  apps: {
    tutorialContract: {
      contractId: '53wiNXNx3Fepf7eQUAgywbkUPykVXVFbw5Z2HtkdBZMb',
    },
  },
};
const client = new Dash.Client(clientOpts);

const submitNoteDocument = async () => {
  const { platform } = client;
  const identity = await platform.identities.get('BhV75k6YdJE7x1heyE3gCaeWvcR6nHNRF8ijg9z8eSjC');

  const docProperties = {
    message: `Tutorial Test @ ${new Date().toUTCString()}`,
  };

  // Create the note document
  const noteDocument = await platform.documents.create(
    'tutorialContract.note',
    identity,
    docProperties,
  );

  const documentBatch = {
    create: [noteDocument], // Document(s) to create
    replace: [],            // Document(s) to update
    delete: [],             // Document(s) to delete
  };
  // Sign and submit the document(s)
  return platform.documents.broadcast(documentBatch, identity);
};

submitNoteDocument()
  .then((d) => console.log(d))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
