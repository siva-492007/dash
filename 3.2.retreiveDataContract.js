const Dash = require('dash');

const client = new Dash.Client();

const retrieveContract = async () => {
  const contractId = '53wiNXNx3Fepf7eQUAgywbkUPykVXVFbw5Z2HtkdBZMb';
  return client.platform.contracts.get(contractId);
};

retrieveContract()
  .then((d) => console.dir(d.toJSON(), { depth: 5 }))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
