import { AxiosResponse, AxiosPromise } from 'axios';
export interface RPCParams {
  jsonrpc: string;
  method: string;
  params: string[];
  id: number;
}
export interface RPCResponse {
  jsonrpc: string;
  result: string | number;
  id: number;
}
export declare const randInt: () => number;
export declare const rpcParams: (
  method: string,
  params?: string[]
) => RPCParams;
export declare const handleRes: (res: AxiosResponse<any>) => any;
export declare const request: (
  host: string,
  params: RPCParams
) => AxiosPromise<RPCResponse>;
export declare const sendTransactionHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => Promise<any>;
};
export declare const sendSignedTransactionHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => Promise<any>;
};
export declare const getBlockNumberHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => any;
};
export declare const getBlockHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => any;
};
export declare const getTransactionHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => any;
};
export declare const getTransactionReceiptHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => any;
};
export declare const getBalanceHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => any;
};
export declare const getMetaDataHandler: (
  host: string,
  number: string
) => AxiosPromise<RPCResponse>;
