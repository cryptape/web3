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
  getBlockHandler
} from './handers';

const CITAWeb3 = (
  provider: Provider | string
  // CustomWeb3?: Web3
) => {
  // const web3 = CustomWeb3 ? new Web3(provider) : new CustomWeb3(provider)
  const web3 = new Web3(provider);

  // add get cita block number
  web3.eth.getBlockNumber = new Proxy(
    web3.eth.getBlockNumber,
    getBlockNumberHandler
  );
  // add send cita transaction
  web3.eth.sendTransaction = new Proxy(
    web3.eth.sendTransaction,
    sendTransactionHandler
  );

  web3.eth.getBlock = new Proxy(web3.eth.getBlock, getBlockHandler);

  return web3;
};

export default CITAWeb3;
