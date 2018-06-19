const CITAWeb3 = require('../lib');

const SERVER = 'http://47.75.129.215:1337';
const web3 = CITAWeb3.default(SERVER);

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
  const tx = {
    from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    privkey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    nonce: 100,
    quota: 100,
    data: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
    value: 0,
    chainId: 1,
    version: 0
  };

  const receipt = await web3.eth.sendTransaction(tx).then(res => res.result);
  expect(receipt.hash).toBeTruthy();
  // setTimeout(() => {
  //   const txResult = await web3.eth.getTransaction(receipt.hash).then(res => res.result);
  //   expect(txResult.hash).toBe(hash);
  //   done();
  // }, 4000);
  done();
});
