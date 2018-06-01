export declare const randInt: () => number;
export declare const rpcParams: (
  method: string,
  params?: string[]
) => {
  jsonrpc: string;
  method: string;
  params: string[];
  id: number;
};
export declare const sendTransactionHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => Promise<any>;
};
export declare const getBlockNumberHandler: {
  apply: (target: Function, thisArg: any, argumentsList: any) => any;
};
