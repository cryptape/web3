import Web3 from 'web3';
import { Provider } from 'web3/types';
import NodeManage from './systems/node';
// import NervosWeb3Plugin from '@nervos/web3-plugin'
// import { default as sign } from '@nervos/signer'
// const Contract = require('web3-eth-contract')
import appchain from './appchain';

// import {
//   sendTransactionHandler,
//   sendSignedTransactionHandler,
//   getBlockNumberHandler,
//   getBlockHandler,
//   getTransactionHandler,
//   getTransactionReceiptHandler,
//   getBalanceHandler,
//   callHandler,
// } from './handlers'
// import callContract from './methods/callContract'
import _executeMethod from './contract';

// import * as parsers from './methods/parsers'

type CustomWeb3 = typeof Web3;

const NervosWeb3 = (
  provider: Provider | string,
  CustomWeb3: CustomWeb3 = Web3
) => {
  const web3 = new CustomWeb3(provider);

  // generate plugins
  // const { Nervos: plugins } = NervosWeb3Plugin({
  //   // server: provider as string
  //   server: typeof provider === 'string' ? provider : (provider as any).host
  // });

  // update Contract
  web3.eth.Contract.prototype._executeMethod = _executeMethod;

  // /**
  //  * @method getBlockNumber
  //  * @param {string} [chainType] - If chainType === 'eth', request block number of Ethereum, else request block number of CITA
  //  * @return {Promise<number>} - Promise to return block number
  //  */
  // web3.eth.getBlockNumber = new Proxy(
  //   web3.eth.getBlockNumber,
  //   getBlockNumberHandler
  // ) as typeof web3.eth.getBlockNumber;

  // /**
  //  * @method sendTransaction
  //  * @param {object} transaction - If transaction includes field of quota, send transaction to CITA, else send transaction to Ethereum
  //  * @return {Promise<TransactionReceipt>}
  //  */
  // web3.eth.sendTransaction = new Proxy(
  //   web3.eth.sendTransaction,
  //   sendTransactionHandler
  // ) as typeof web3.eth.sendTransaction;

  // /**
  //  * @method sendSignedTransaction
  //  * @param {string} signed_tx - send signed transaction to ethereum or cita, same as sendTransaction
  //  * @param {string} [chainType] - If chainType === 'eth', send signed transaction to Ethereum
  //  * @return {Promise<TransactionReceipt>}
  //  */

  // web3.eth.sendSignedTransaction = new Proxy(
  //   web3.eth.sendSignedTransaction,
  //   sendSignedTransactionHandler
  // ) as typeof web3.eth.sendSignedTransaction;

  // /**
  //  * @method getTransaction
  //  * @param {string} txHash -  Hash of transaction
  //  * @param {string} [chainType] - if chainType === 'eth', request Ethereum
  //  */
  // web3.eth.getTransaction = new Proxy(
  //   web3.eth.getTransaction,
  //   getTransactionHandler
  // ) as typeof web3.eth.getTransaction;

  // /**
  //  * @method getBlock
  //  * @param {string} hashOrNumber - Hash or Number of Block
  //  * @param {string} [txInfo] - If true, CITA will return block with transaction content, else return block with transaction hash
  //  * @param {string} [chainType] - If chainType === 'eth', request Ethereum
  //  */
  // web3.eth.getBlock = new Proxy(
  //   web3.eth.getBlock,
  //   getBlockHandler
  // ) as typeof web3.eth.getBlock;

  // web3.eth.getTransactionReceipt = new Proxy(
  //   web3.eth.getTransactionReceipt,
  //   getTransactionReceiptHandler
  // ) as typeof web3.eth.getTransactionReceipt;

  // web3.eth.getBalance = new Proxy(
  //   web3.eth.getBalance,
  //   getBalanceHandler
  // ) as typeof web3.eth.getBalance;

  // web3.eth.call = new Proxy(web3.eth.call, callHandler) as typeof web3.eth.call;

  // /**
  //  * cita specific method
  //  */

  // const cita = {
  //   ...plugins,
  //   storeAbi: async (addr: string, abiBytes: string) => {
  //     // get chain id
  //     const { chainId } = (await plugins.metadata({
  //       blockNumber: 'latest'
  //     })) as any;

  //     // get current height
  //     const currentHeight = await web3.eth
  //       .getBlockNumber()
  //       .then((res: any) => res.result);
  //     const bytecode = addr + abiBytes;

  //     // construct transaction
  //     const tx = {
  //       to: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  //       quota: 999999,
  //       version: 0,
  //       value: 0,
  //       nonce: Math.round(Math.random() * 10),
  //       data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
  //       validUntilBlock: +currentHeight + 88,
  //       chainId
  //     };
  //     return web3.eth.sendTransaction(tx);
  //   },
  //   createTxObject: Contract.prototype._createTxObject,
  //   callContract: callContract(web3),
  //   sign,
  //   parsers,
  //   contract: async (abi: any[], addr: string) => {
  //     const myContract = new web3.eth.Contract(abi, addr);
  //     return myContract;
  //   },
  //   deploy: async (bytecode: string, transaction: any) => {
  //     const { chainId } = (await plugins.metadata({
  //       blockNumber: 'latest'
  //     })) as any;

  //     const currentHeight = await web3.eth
  //       .getBlockNumber()
  //       .then((res: any) => res.result);

  //     const tx = {
  //       quota: 999999,
  //       version: 0,
  //       value: 0,
  //       nonce: Math.round(Math.random() * 10),
  //       ...transaction,
  //       data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
  //       validUntilBlock: +currentHeight + 88,
  //       chainId
  //     };
  //     const result = await web3.eth
  //       .sendTransaction(tx)
  //       .then((res: any) => res.result);

  //     if (!result.hash) {
  //       return new Error('No Transaction Hash Received');
  //     }
  //     let remain = 10;
  //     return new Promise((resolve, reject) => {
  //       let interval = setInterval(() => {
  //         remain = remain - 1;
  //         if (remain > 0) {
  //           web3.eth.getTransactionReceipt(result.hash).then((res: any) => {
  //             if (res.result) {
  //               clearInterval(interval);
  //               resolve(res);
  //             }
  //           });
  //         } else {
  //           reject('No Receipt Received');
  //         }
  //       }, 1000);
  //     });
  //   }
  // };

  const system = {
    node: new NodeManage(provider as string, web3)
  };

  const target = Object.assign(appchain(web3), { system });
  return target;
};

export default NervosWeb3;
