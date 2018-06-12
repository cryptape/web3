import Web3 from 'web3';
import { HttpProvider, IpcProvider, WebsocketProvider } from 'web3/types';
declare const CITAWeb3: (
  provider: string | WebsocketProvider | HttpProvider | IpcProvider,
  CustomWeb3?: typeof Web3
) => any;
export default CITAWeb3;
