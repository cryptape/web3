import Web3 from 'web3';
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
    createTxObject: any;
    callContract: (
      method: string,
      params: object
    ) => import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/axios').AxiosPromise;
    getMetaData: (
      number?: string
    ) => import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/axios').AxiosPromise;
    sign: (
      {
        privateKey,
        data,
        nonce,
        quota,
        validUntilBlock,
        value,
        version,
        chainId,
        to
      }: {
        privateKey: string;
        data?: string | undefined;
        nonce: string;
        quota: number;
        validUntilBlock: string | number;
        value?: string | undefined;
        version?: number | undefined;
        chainId: number;
        to?: string | undefined;
      }
    ) => any;
    parsers: typeof parsers;
    contract: (
      abi: any[],
      addr: string
    ) => Promise<
      import('../../../../../../../Users/ChenYu/Documents/cryptape/projects/web3/node_modules/web3/types').Contract
    >;
    deploy: (
      bytecode: string,
      transaction: any,
      abi?: string | undefined
    ) => Promise<{}>;
  };
};
export default NervosWeb3;
