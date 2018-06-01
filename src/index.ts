import Web3 from 'web3';
import {
  Provider,
  HttpProvider,
  IpcProvider,
  WebsocketProvider
} from 'web3/types';
import {
  sendTransactionHandler,
  getBlockNumberHandler,
  getBlockHandler,
  getTransactionHandler,
  getMetaDataHandler,
  RPCParams,
  RPCResponse
} from './handlers';

const CITAWeb3 = (
  provider: Provider | string
  // CustomWeb3?: Web3
) => {
  // const web3 = CustomWeb3 ? new Web3(provider) : new CustomWeb3(provider)
  const web3 = new Web3(provider);

  // add get cita block number

  /**
   * @method getBlockNumber
   * @param eth - if eth === 'eth', request ethereum block number, else request cita block number
   */
  web3.eth.getBlockNumber = new Proxy(
    web3.eth.getBlockNumber,
    getBlockNumberHandler
  );
  // add send cita transaction
  /**
   * @method sendTransaction
   * @param {object} tx - send transaction to ethereum or cita, according to if tx has quota
   */
  web3.eth.sendTransaction = new Proxy(
    web3.eth.sendTransaction,
    sendTransactionHandler
  );

  /**
   * @method getTransaction
   * @param {string} txHash - if 'eth', request ethereum
   * @param {string} txHash - if request ethereum, this is the hash of transaction
   */
  web3.eth.getTransaction = new Proxy(
    web3.eth.getTransaction,
    getTransactionHandler
  );

  /**
   * @method getBlock
   * @param {string} hashOrNumber - if 'eth', request ethereum,
   * @param {string} hashOrNumber - if prev arg == 'eth', this is the hash or number for ethereum
   */
  web3.eth.getBlock = new Proxy(web3.eth.getBlock, getBlockHandler);

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
