import Web3 from 'web3';
import * as rpc from './rpc';
import * as personal from './neuron';
import listener from './listener';

export default (
  web3: Web3 & {
    appchain?: any;
  }
) => {
  web3.extend({
    property: 'appchain',
    methods: [
      rpc.peerCount,
      rpc.getMetaData,
      rpc.getAbi,
      rpc.getCode,
      rpc.getBalance,
      rpc.getTransactionReceipt,
      rpc.getAccounts,
      rpc.getBlock,
      rpc.getBlockByHash,
      rpc.getBlockByNumber,
      rpc.getBlockNumber,
      rpc.getBlockTransactionCount,
      rpc.getTransaction,
      rpc.getTransactionCount,
      rpc.getTransactionProof,
      rpc.sendSignedTransaction,
      rpc.signTransaction,
      rpc.sendTransaction,
      rpc.sign,
      rpc.call,
      rpc.newMessageFilter,
      rpc.newBlockFilter,
      rpc.getFilterLogs,
      rpc.getFilterChanges,
      rpc.deleteMessageFilter,
      rpc.getLogs,
      personal.getAccounts,
      personal.newAccount,
      // personal.unlockAccount,
      // personal.lockAccount,
      // personal.sendTransaction,
      // personal.signTransaction,
      personal.sign,
      personal.ecRecover
    ]
  });
  // add contract
  web3.appchain.Contract = web3.eth.Contract;

  web3.appchain.deploy = async (bytecode: string, transaction: any) => {
    const currentHeight = transaction.validUntilBlock
      ? +transaction.validUntilBlock - 88
      : await web3.appchain.getBlockNumber().catch((err: any) => {
          console.error(err);
        });

    const tx = {
      version: 0,
      value: 0,
      nonce: Math.round(Math.random() * 10),
      ...transaction,
      data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
      validUntilBlock: +currentHeight + 88
    };
    const result = await web3.appchain.sendTransaction(tx).catch((err: any) => {
      console.error(err);
    });

    if (!result.hash) {
      return new Error('No Transaction Hash Received');
    }
    let remain = 10;
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        remain = remain - 1;
        if (remain > 0) {
          web3.appchain.getTransactionReceipt(result.hash).then((res: any) => {
            if (res) {
              clearInterval(interval);
              resolve(res);
            }
          });
        } else {
          reject('No Receipt Received');
        }
      }, 1000);
    }).catch((err: any) => {
      console.error(err);
    });
  };
  // web3.appchain.storeAbi = async (address:string, abi:string) => {
  //   if (!address) {
  //     throw new Error('Store ABI needs contract address')
  //   }
  //   if (typeof abi !== 'string') {
  //     throw new Error('ABI should be string')
  //   }

  //   let hexedABI = web3.utils.fromUtf8(abi)
  //   hexedABI = hexedABI.startsWith('0x') ? hexedABI.slice(2) : hexedABI

  // }
  const neuron = {
    sign: web3.appchain.neuron_sign
  };
  web3.appchain.personal = neuron;

  return listener(web3);
};
