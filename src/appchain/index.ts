import Web3 from 'web3';
import signer, { unsigner } from '@nervos/signer';
import * as rpc from './rpc';
import * as personal from './neuron';
import listener from './listener';
import addPrivateKeyFrom from '../utils/addPrivateKey';

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
  web3.appchain.signer = signer;
  web3.appchain.unsigner = unsigner;

  web3.appchain.deploy = async (bytecode: string, transaction: any) => {
    const currentHeight = await web3.appchain
      .getBlockNumber()
      .catch((err: any) => {
        console.error(err);
      });

    const _tx = {
      version: 0,
      value: 0,
      nonce: Math.round(Math.random() * 10),
      ...transaction,
      data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
      validUntilBlock: +currentHeight + 88
    };

    const tx = addPrivateKeyFrom(web3.eth.accounts.wallet)(_tx);

    const result = await web3.appchain.sendTransaction(tx).catch((err: any) => {
      throw new Error(err);
    });

    if (!result.hash) {
      return new Error('No Transaction Hash Received');
    }
    return web3.listeners.listenToTransactionReceipt(result.hash);
  };
  web3.appchain.storeAbi = async (address: string, abi: string) => {
    if (!address) {
      throw new Error('Store ABI needs contract address');
    }
    if (typeof abi !== 'string') {
      throw new Error('ABI should be string');
    }
    const currentHeight = await web3.appchain
      .getBlockNumber()
      .catch((err: any) => {
        console.error(err);
      });

    const privateKey =
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const hexedABI =
      '73552bc4e960a1d53013b40074569ea05b950b4d4ed3885e000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001275b7b22636f6e7374616e74223a66616c73652c22696e70757473223a5b7b226e616d65223a2278222c2274797065223a2275696e74323536227d5d2c226e616d65223a22736574222c226f757470757473223a5b5d2c2270617961626c65223a66616c73652c2273746174654d75746162696c697479223a226e6f6e70617961626c65222c2274797065223a2266756e6374696f6e227d2c7b22636f6e7374616e74223a747275652c22696e70757473223a5b5d2c226e616d65223a22676574222c226f757470757473223a5b7b226e616d65223a22222c2274797065223a2275696e74323536227d5d2c2270617961626c65223a66616c73652c2273746174654d75746162696c697479223a2276696577222c2274797065223a2266756e6374696f6e227d5d00000000000000000000000000000000000000000000000000';
    const abiAddr = '0xffffffffffffffffffffffffffffffffff010001';
    const tx = {
      privateKey,
      version: 0,
      value: 0,
      to: abiAddr,
      nonce: Math.round(Math.random() * 10),
      data: hexedABI,
      validUntilBlock: +currentHeight + 88,
      quota: 89999
    };

    const txResult = await web3.appchain.sendTransaction(tx);
    console.log(txResult);
    const txReceipt = await web3.listeners.listenToTransactionReceipt(
      txResult.hash
    );
    console.log(txReceipt);
  };
  const neuron = {
    sign: web3.appchain.neuron_sign
  };
  web3.appchain.personal = neuron;

  return web3;
};
