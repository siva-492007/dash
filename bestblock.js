const Dash = require('dash');

const client = new Dash.Client({
  network: 'evonet',
  wallet: {
    mnemonic: 'arena light cheap control apple buffalo indicate rare motor valid accident isolate',
  },
});

// Accessing an account allows you to transact with the Dash Network
client.getWalletAccount().then(async (account) => {
  console.log('Funding address', account.getUnusedAddress().address);

  const balance = account.getConfirmedBalance();
  console.log('Confirmed Balance', balance);

  if (balance > 0) {
    // Creating an identity is the basis of all interactions with the Dash Platform
    const identity = await client.platform.identities.register();

    // Prepare a new document containing a simple hello world sent to a hypothetical tutorial contract
    const document = await client.platform.documents.create(
      'tutorialContract.note',
      identity,
      { message: 'Hello World' },
    );

    // Broadcast the document into a new state transition
    await client.platform.documents.broadcast({ create: [document] }, identity);
  }
});
