import Web3 from 'web3';
import * as rpc from './rpc';
import * as personal from './neuron';
import listener from './listener';

export interface EnhancedWeb3 extends Web3 {
  appchain?: any;
  listeners?: any;
}

export default (web3: EnhancedWeb3) => {
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
  web3 = listener(web3) as any;

  web3.appchain.deploy = async (bytecode: string, transaction: any) => {
    const currentHeight = await web3.appchain
      .getBlockNumber()
      .catch((err: any) => {
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
      throw new Error(err);
    });

    if (!result.hash) {
      return new Error('No Transaction Hash Received');
    }
    return web3.listeners.listenToTransactionReceipt(result.hash);
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

  return web3;
};
