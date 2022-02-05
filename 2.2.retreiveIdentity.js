const Dash = require('dash');

const client = new Dash.Client();

const retrieveIdentity = async () => {
  return client.platform.identities.get('BhV75k6YdJE7x1heyE3gCaeWvcR6nHNRF8ijg9z8eSjC');
};

retrieveIdentity()
  .then((d) => console.log('Identity retrieved:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
