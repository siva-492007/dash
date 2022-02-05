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

const sendFunds = async () => {
  const account = await client.getWalletAccount();

  const transaction = account.createTransaction({
    recipient: 'ycvos6Rqy7sjP8kXwY5ND5VosnW3jaLiNQ', // Testnet2 faucet
    satoshis: 1000000, // 1 Dash
  });
  return account.broadcastTransaction(transaction);
};

sendFunds()
  .then((d) => console.log('Transaction broadcast!\nTransaction ID:', d))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());

// Handle wallet async errors
client.on('error', (error, context) => {
  console.error(`Client error: ${error.name}`);
  console.error(context);
});
