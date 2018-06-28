import Web3 from 'web3';
import { Provider } from 'web3/types';
import {
  sendTransactionHandler,
  sendSignedTransactionHandler,
  getBlockNumberHandler,
  getBlockHandler,
  getTransactionHandler,
  getMetaDataHandler,
  getTransactionReceiptHandler,
  getBalanceHandler,
  callHandler
  // ContractWith,
  // ContractHandler,
} from './handlers';
import citaSignTransaction, {
  CITASendTransactionArugments
} from './methods/citaSignTransaction';
import callContract from './methods/callContract';
const Contract = require('web3-eth-contract');

import * as parsers from './methods/parsers';

type CustomWeb3 = typeof Web3;

const NervosWeb3 = (
  provider: Provider | string,
  CustomWeb3: CustomWeb3 = Web3
) => {
  const web3 = new CustomWeb3(provider);

  /**
   * @method getBlockNumber
   * @param {string} [chainType] - If chainType === 'eth', request block number of Ethereum, else request block number of CITA
   * @return {Promise<number>} - Promise to return block number
   */
  web3.eth.getBlockNumber = new Proxy(
    web3.eth.getBlockNumber,
    getBlockNumberHandler
  ) as typeof web3.eth.getBlockNumber;

  /**
   * @method sendTransaction
   * @param {object} transaction - If transaction includes field of quota, send transaction to CITA, else send transaction to Ethereum
   * @return {Promise<TransactionReceipt>}
   */
  web3.eth.sendTransaction = new Proxy(
    web3.eth.sendTransaction,
    sendTransactionHandler
  ) as typeof web3.eth.sendTransaction;

  /**
   * @method sendSignedTransaction
   * @param {string} signed_tx - send signed transaction to ethereum or cita, same as sendTransaction
   * @param {string} [chainType] - If chainType === 'eth', send signed transaction to Ethereum
   * @return {Promise<TransactionReceipt>}
   */

  web3.eth.sendSignedTransaction = new Proxy(
    web3.eth.sendSignedTransaction,
    sendSignedTransactionHandler
  ) as typeof web3.eth.sendSignedTransaction;

  /**
   * @method getTransaction
   * @param {string} txHash -  Hash of transaction
   * @param {string} [chainType] - if chainType === 'eth', request Ethereum
   */
  web3.eth.getTransaction = new Proxy(
    web3.eth.getTransaction,
    getTransactionHandler
  ) as typeof web3.eth.getTransaction;

  /**
   * @method getBlock
   * @param {string} hashOrNumber - Hash or Number of Block
   * @param {string} [txInfo] - If true, CITA will return block with transaction content, else return block with transaction hash
   * @param {string} [chainType] - If chainType === 'eth', request Ethereum
   */
  web3.eth.getBlock = new Proxy(
    web3.eth.getBlock,
    getBlockHandler
  ) as typeof web3.eth.getBlock;

  web3.eth.getTransactionReceipt = new Proxy(
    web3.eth.getTransactionReceipt,
    getTransactionReceiptHandler
  ) as typeof web3.eth.getTransactionReceipt;

  web3.eth.getBalance = new Proxy(
    web3.eth.getBalance,
    getBalanceHandler
  ) as typeof web3.eth.getBalance;

  // web3.eth.Contract = new Proxy(
  //   web3.eth.Contract,
  //   ContractHandler,
  // ) as typeof web3.eth.Contract

  web3.eth.call = new Proxy(web3.eth.call, callHandler) as typeof web3.eth.call;

  /**
   * cita specific method
   */
  const cita = {
    createTxObject: Contract.prototype._createTxObject,
    callContract: callContract(web3),
    getMetaData: (number: string = 'latest') =>
      getMetaDataHandler(provider as string, number),
    sign: (tx: CITASendTransactionArugments) => citaSignTransaction(tx),
    parsers,
    contract: async (abi: any[], addr: string) => {
      const myContract = new web3.eth.Contract(abi, addr);
      return myContract;
    },
    deploy: async (bytecode: string, transaction: any, abi?: string) => {
      const chainId = await cita
        .getMetaData()
        .then((res: any) => res.result.chainId);

      const currentHeight = await web3.eth
        .getBlockNumber()
        .then((res: any) => res.result);

      console.log(abi);

      const tx = {
        quota: 999999,
        version: 0,
        value: 0,
        nonce: Math.round(Math.random() * 10),
        ...transaction,
        data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
        validUntilBlock: +currentHeight + 88,
        chainId
      };
      console.log('send transaction');
      console.log(tx);
      const result = await web3.eth
        .sendTransaction(tx)
        .then((res: any) => res.result);

      if (!result.hash) {
        return new Error('No Transaction Hash Received');
      }
      let remain = 10;
      return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
          remain = remain - 1;
          if (remain > 0) {
            web3.eth.getTransactionReceipt(result.hash).then((res: any) => {
              console.log('receiving receipt');
              console.log(res);
              if (res.result) {
                clearInterval(interval);
                resolve(res);
              }
            });
          } else {
            reject('No Receipt Received');
          }
        }, 1000);
      });
    }
  };

  const target = Object.assign(web3, { cita });
  return target;
};

export default NervosWeb3;
