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

const createIdentity = async () => {
  return client.platform.identities.register();
};

createIdentity()
  .then((d) => console.log('Identity:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
