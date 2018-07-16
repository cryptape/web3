import Web3 from 'web3';
import * as rpc from './rpc';
import * as personal from './personal';

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
  web3.appchain.Contract = web3.eth.Contract;
  return web3;
};
