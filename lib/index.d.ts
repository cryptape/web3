import Web3 from 'web3';
import { CITASendTransactionArugments } from './methods/citaSignTransaction';
import * as parsers from './methods/parsers';
declare const NervosWeb3: (
  provider:
    | string
    | import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/web3/types').WebsocketProvider
    | import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/web3/types').HttpProvider
    | import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/web3/types').IpcProvider,
  CustomWeb3?: typeof Web3
) => Web3 & {
  cita: {
    getMetaData: (
      number?: string
    ) => import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/axios').AxiosPromise;
    sign: (tx: CITASendTransactionArugments) => string;
    parsers: typeof parsers;
  };
};
export default NervosWeb3;
