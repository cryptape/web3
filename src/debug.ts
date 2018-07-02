import NervosWeb3 from './index';
const SERVER = 'localhost:1337';

const web3 = NervosWeb3(SERVER);
const tx = {
  from: '0x0438BFcaBdDa99c00aCF0039e6c1F3F2d78EDde5',
  privateKey:
    '0x6df169367e91caab0f63120aeb296fce34fd21e95dedd635f2d0cce3f5c8e47f',
  nonce: 'ELH1A3',
  chainId: 1,
  validUntilBlock: '3300',
  version: 0,
  value: '0',
  quota: 1000000,
  data: '0x7965730000000000000000000000000000000000000000000000000000000000',
  to: ''
};

console.log(web3.cita.sign(tx));
