import Web3 from 'web3';
import { Provider } from 'web3/types';
import {
  sendTransactionHandler,
  sendSignedTransactionHandler,
  getBlockNumberHandler,
  getBlockHandler,
  getTransactionHandler,
  getMetaDataHandler
} from './handlers';
import citaSignTransaction, {
  CITASendTransactionArugments
} from './methods/citaSignTransaction';
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

  /**
   * cita specific method
   */
  const cita = {
    getMetaData: (number: string = 'latest') =>
      getMetaDataHandler(provider as string, number),
    sign: (tx: CITASendTransactionArugments) => citaSignTransaction(tx),
    parsers
  };

  return Object.assign(web3, { cita });
};

export default NervosWeb3;
