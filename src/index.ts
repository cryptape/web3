import Web3 from 'web3';
import {
  Provider
  // HttpProvider,
  // IpcProvider,
  // WebsocketProvider,
} from 'web3/types';
import {
  sendTransactionHandler,
  sendSignedTransactionHandler,
  getBlockNumberHandler,
  getBlockHandler,
  getTransactionHandler,
  getMetaDataHandler
  // RPCParams,
  // RPCResponse,
} from './handlers';
type IWeb3 = typeof Web3;

const CITAWeb3 = (provider: Provider | string, CustomWeb3: IWeb3 = Web3) => {
  const web3 = new CustomWeb3(provider);

  // add get cita block number

  /**
   * @method getBlockNumber
   * @param eth - if eth === 'eth', request ethereum block number, else request cita block number
   */
  web3.eth.getBlockNumber = new Proxy(
    web3.eth.getBlockNumber,
    getBlockNumberHandler
  ) as typeof web3.eth.getBlockNumber;
  // add send cita transaction
  /**
   * @method sendTransaction
   * @param {object} tx - send transaction to ethereum or cita, according to if tx has quota
   */
  web3.eth.sendTransaction = new Proxy(
    web3.eth.sendTransaction,
    sendTransactionHandler
  ) as typeof web3.eth.sendTransaction;

  /**
   * @method sendSignedTransaction
   * @param {string} signed_tx - send signed transaction to ethereum or cita, same as sendTransaction
   */

  web3.eth.sendSignedTransaction = new Proxy(
    web3.eth.sendSignedTransaction,
    sendSignedTransactionHandler
  ) as typeof web3.eth.sendSignedTransaction;

  /**
   * @method getTransaction
   * @param {string} txHash - if 'eth', request ethereum
   * @param {string} txHash - if request ethereum, this is the hash of transaction
   */
  web3.eth.getTransaction = new Proxy(
    web3.eth.getTransaction,
    getTransactionHandler
  ) as typeof web3.eth.getTransaction;

  /**
   * @method getBlock
   * @param {string} hashOrNumber - if 'eth', request ethereum,
   * @param {string} hashOrNumber - if prev arg == 'eth', this is the hash or number for ethereum
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
      getMetaDataHandler(provider as string, number)
  };

  return Object.assign(web3, { cita });
};

export default CITAWeb3;
