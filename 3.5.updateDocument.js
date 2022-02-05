const Dash = require('dash');

const clientOpts = {
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

const updateNoteDocument = async () => {
  const { platform } = client;
  const identity = await platform.identities.get('BhV75k6YdJE7x1heyE3gCaeWvcR6nHNRF8ijg9z8eSjC');
  const documentId = '2FKebcG4QCCdYmjVSBhhD6Zewywbz3NJjgPhbGJoCfQX';

  // Retrieve the existing document
  const [document] = await client.platform.documents.get(
    'tutorialContract.note',
    { where: [['$id', '==', documentId]] },
  );

  // Update document
  document.set('message', `Updated document @ ${new Date().toUTCString()}`);

  // Sign and submit the document replace transition
  return platform.documents.broadcast({ replace: [document] }, identity);
};

updateNoteDocument()
  .then((d) => console.log('Document updated:\n', d))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
