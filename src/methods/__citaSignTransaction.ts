import blockchain from '../../proto-ts/blockchain_pb';

const EC = require('elliptic').ec;
const utils = require('web3-utils');
var sha3 = require('crypto-js/sha3');

const ec = new EC('secp256k1');
export default function(options: any) {
  options = {
    from: '0x0438BFcaBdDa99c00aCF0039e6c1F3F2d78EDde5',
    privkey:
      '0x2c5c6c187d42e58a4c212a4aab0a3cfa4030256ed82bb3e05706706ab5be9641',
    nonce: 'ELH1A3',
    chainId: 1,
    validUntilBlock: 172964,
    data:
      '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
    version: 0,
    value: 0
  };
  console.log(options);

  // create Transaction
  var tx = new blockchain.Transaction();
  if (!options.nonce) {
    throw new Error('nonce error');
  }
  tx.setNonce(options.nonce);

  if (options.quota <= 0) {
    throw new Error('quota must be more than 0');
  }
  tx.setQuota(options.quota);

  if (options.to) {
    tx.setTo(options.to);
  }

  if (!options.validUntilBlock) {
    throw new Error('vaild until block error');
  }
  tx.setValidUntilBlock(options.validUntilBlock);

  if (options.chainId < 0) {
    throw new Error('chain_id error');
  }
  tx.setChainId(options.chainId);

  // if (options.data.slice(0, 2) == '0x') {
  //     options.data = options.data.slice(2);
  // }
  tx.setData(new Uint8Array(Buffer.from(options.data, 'hex')));
  tx.setValue(options.value);

  var msg = tx.serializeBinary();
  var hex = msg.reduce(function(r, a) {
    return r.concat(a.toString(16).padStart(2, '0'));
  }, '');

  var hash = sha3(hex, { encoding: 'hex' });

  // var sign1 = secp256k1.sign(new Buffer(hash.toString(), 'hex'), new Buffer(options.privkey, 'hex'));
  // var bytes1 =  new Uint8Array(65);
  // console.log("sign1 signature: "+ JSON.stringify(sign1.signature));
  // bytes1.set(sign1.signature);
  // bytes1[64] = sign1.recovery;
  // console.log("sign1: ",  bytes1.reduce(function(r,a) {
  //     return r.concat(a.toString(16).padStart(2, '0'));
  // }, ""));

  var key = ec.keyFromPrivate(options.privkey, 'hex');
  var sign = key.sign(new Buffer(hash.toString(), 'hex'));
  var sign_r = sign.r.toString(16);
  var sign_s = sign.s.toString(16);
  if (sign_r.length == 63) sign_r = '0' + sign_r;
  if (sign_s.length == 63) sign_s = '0' + sign_s;
  var signature = sign_r + sign_s;
  var sign_buffer = new Buffer(signature, 'hex');
  var bytes = new Uint8Array(65);
  bytes.set(sign_buffer);
  bytes[64] = sign.recoveryParam;

  // create UnverifiedTransaction
  var tx2 = new blockchain.UnverifiedTransaction();
  tx2.setTransaction(tx);
  tx2.setCrypto(blockchain.Crypto.SECP);
  tx2.setSignature(bytes);

  // get protobuf of UnverifiedTransaction
  var bytes = tx2.serializeBinary();

  var hexstr = bytes.reduce(function(r, a) {
    return r.concat(a.toString(16).padStart(2, '0'));
  }, '');

  hexstr = hexstr.slice(0, 2) == '0x' ? hexstr : '0x' + hexstr;

  console.log('inside');
  console.log(hexstr);
  console.log(hexstr.length);

  return hexstr;
}
