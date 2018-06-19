import Web3 from 'web3';
declare const CITAWeb3: (
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
  };
};
export default CITAWeb3;
