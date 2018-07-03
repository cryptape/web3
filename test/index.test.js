const CITAWeb3 = require('../lib');

const SERVER = 'http://121.196.200.225:1337';
const web3 = CITAWeb3.default(SERVER);

const tx = {
  from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  privateKey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  nonce: 100,
  quota: 100,
  data: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  value: 0,
  chainId: 1,
  version: 0
};

test('Get MetaData', async () => {
  const metadata = await web3.cita.getMetaData().then(res => res.result);
  expect(metadata.chainId).not.toBeUndefined();
});

test('Get Block Number', async () => {
  const number = await web3.eth.getBlockNumber().then(res => res.result);
  expect(number.startsWith('0x')).toBe(true);
});

test('Get Block By Earliest', async () => {
  const block = await web3.eth.getBlock('earliest').then(res => res.result);
  expect(block.hash).toBeTruthy();
});
test('Get Block By Latest', async () => {
  const block = await web3.eth.getBlock('latest').then(res => res.result);
  expect(block.hash).toBeTruthy();
});

test('Get Block By Number of Hex', async () => {
  const block = await web3.eth.getBlock('0x0').then(res => res.result);
  expect(block.hash).toBeTruthy();
});

test('Get Block By Hash', async () => {
  const genesis = await web3.eth.getBlock('latest').then(res => res.result);
  const block = await web3.eth.getBlock(genesis.hash).then(res => res.result);
  expect(block.hash).toBeTruthy();
});

test('Send Transaction', async (done) => {

  const receipt = await web3.eth.sendTransaction(tx).then(res => res.result);
  expect(receipt.hash).toBeTruthy();
  done();
});


test.skip('Send signed transaction', async () => {
  await web3.eth.getBlockNumber().then(res => {
    tx.validUntilBlock = +res.result + 88;
  });
  tx.nonce = 200;
  const signedTx = web3.cita.sign(tx);
  const receipt = await web3.eth.sendSignedTransaction(signedTx).then(res => res.data);
  console.log(receipt);
  expect(receipt.hash).toBeTruthy();
});
