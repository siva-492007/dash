const Dash = require('dash');

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: 'cross gossip truth despair cinnamon pumpkin toast model spoon multiply isolate say',
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 500000, // only sync from mid-2021
    },
  },
};
const client = new Dash.Client(clientOpts);

const topupIdentity = async () => {
  const identityId = 'BhV75k6YdJE7x1heyE3gCaeWvcR6nHNRF8ijg9z8eSjC';
  const topUpAmount = 1000; // Number of duffs

  await client.platform.identities.topUp(identityId, topUpAmount);
  return client.platform.identities.get(identityId);
};

topupIdentity()
  .then((d) => console.log('Identity credit balance: ', d.balance))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
