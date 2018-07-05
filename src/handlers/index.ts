import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { default as sign } from '@nervos/signer';

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
export const randInt = () => Math.floor(Math.random() * 1000);

export const rpcParams = (
  method: string,
  params: string[] = []
): RPCParams => ({
  jsonrpc: '2.0',
  method,
  params,
  id: randInt()
});

export const handleRes = (res: AxiosResponse) => res.data;
export const request = (
  host: string,
  params: RPCParams
): AxiosPromise<RPCResponse> => axios.post(host, params).then(handleRes);

/**
 * @method sendCitaTransaction
 */
export const sendTransactionHandler = {
  apply: async function(target: Function, thisArg: any, argumentsList: any) {
    const tx = argumentsList[0];

    if (tx.quota !== undefined) {
      if (typeof tx.validUntilBlock === 'undefined') {
        tx.validUntilBlock = +(await thisArg.getBlockNumber()).result + 88;
      }
      // const unverifiedTransactionData = citaSignTransaction(tx);
      const unverifiedTransactionData = sign(tx);
      return request(
        thisArg.currentProvider.host,
        rpcParams('sendRawTransaction', [unverifiedTransactionData])
      );
    }
    return target(...argumentsList);
  }
};

/**
 * @method sendRawCitaTransaction
 */
export const sendSignedTransactionHandler = {
  apply: async function(target: Function, thisArg: any, argumentsList: any) {
    const signedTx = argumentsList[0];
    const chainType = argumentsList[1];
    if (chainType === 'eth') {
      return target(signedTx);
    }
    return request(
      thisArg.currentProvider.host,
      rpcParams('sendRawTransaction', [signedTx])
    );
  }
};

/**
 * @method getCitaBlockNumber
 */
export const getBlockNumberHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const chainType = argumentsList[0];
    if (chainType === 'eth') {
      return target();
    }
    return request(thisArg.currentProvider.host, rpcParams('blockNumber'));
  }
};

/**
 * @method getCitaBlock
 */
export const getBlockHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const hashOrNumber = argumentsList[0];
    const txInfo = argumentsList[1] || false;
    const chainType = argumentsList[argumentsList.length - 1];
    if (chainType === 'eth') {
      return target(hashOrNumber);
    }

    if (hashOrNumber.length === 66) {
      return request(
        thisArg.currentProvider.host,
        rpcParams('getBlockByHash', [hashOrNumber, txInfo])
      );
    }

    return request(
      thisArg.currentProvider.host,
      rpcParams('getBlockByNumber', [hashOrNumber, txInfo])
    );
  }
};

//TODO: ADD DOC
export const getTransactionHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const txHash = argumentsList[0];
    const chainType = argumentsList[1];
    if (chainType === 'eth') {
      return target(txHash);
    }
    return request(
      thisArg.currentProvider.host,
      rpcParams('getTransaction', [txHash])
    );
  }
};

//TODO: ADD DOC
export const getTransactionReceiptHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const txHash = argumentsList[0];
    const chainType = argumentsList[1];
    if (chainType === 'eth') {
      return target(txHash);
    }
    return request(
      thisArg.currentProvider.host,
      rpcParams('getTransactionReceipt', [txHash])
    );
  }
};
//TODO: ADD DOC
export const getBalanceHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const addr = argumentsList[0];
    const chainType = argumentsList[1];
    if (chainType === 'eth') {
      return target(addr);
    }
    return request(
      thisArg.currentProvider.host,
      rpcParams('getBalance', [addr, 'latest'])
    );
  }
};

// TODO: ADD DOC
export const ContractHandler = {
  construct(target: any, args: ArrayLike<any>) {
    if (args[args.length - 1] === 'eth') {
      return new target(args);
    }
  }
};

// TODO: ADD DOC
export const callHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const args = [...argumentsList];
    const chainType = args.pop();
    if (chainType === 'eth') {
      return target(args);
    }
    return request(
      thisArg.currentProvider.host,
      rpcParams('call', [...args, chainType])
    );
  }
};

/**
 * @method getMetaData
 */

export const getMetaDataHandler = (host: string, number: string) => {
  return request(host, rpcParams('getMetaData', [number]));
};

export const getAbiHandler = (host: string, addr: string, number: string) => {
  return request(host, rpcParams('getAbi', [addr, number]));
};
