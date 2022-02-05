const Dash = require('dash');

const clientOpts = {
  wallet: {
    mnemonic: 'cross gossip truth despair cinnamon pumpkin toast model spoon multiply isolate say',
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 500000, // only sync from mid-2021
    },
  },
};
const client = new Dash.Client(clientOpts);

const registerName = async () => {
  const { platform } = client;

  const identity = await platform.identities.get('BhV75k6YdJE7x1heyE3gCaeWvcR6nHNRF8ijg9z8eSjC');
  const nameRegistration = await platform.names.register(
    'blockbot.dash',
    { dashUniqueIdentityId: identity.getId() },
    identity,
  );

  return nameRegistration;
};

registerName()
  .then((d) => console.log('Name registered:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
