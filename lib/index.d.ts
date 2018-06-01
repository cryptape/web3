import Web3 from "web3";
import { HttpProvider, IpcProvider, WebsocketProvider } from "web3/types";
declare const CITAWeb3: (
  provider: string | WebsocketProvider | HttpProvider | IpcProvider
) => Web3;
export default CITAWeb3;
