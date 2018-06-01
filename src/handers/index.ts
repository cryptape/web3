import axios, { AxiosResponse, AxiosPromise } from 'axios';
import citaSignTransaction from '../methods/citaSignTransaction';

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

    if (tx.quota) {
      if (typeof tx.validUntilBlock === 'undefined') {
        tx.validUntilBlock = +(await thisArg.getBlockNumber()).result + 88;
      }
      const unverifiedTransactionData = citaSignTransaction(tx);
      return request(
        thisArg.currentProvider.host,
        rpcParams('cita_sendTransaction', [unverifiedTransactionData.slice(2)])
      );
    }
    return target(...argumentsList);
  }
};

/**
 * @method getCitaBlockNumber
 */
export const getBlockNumberHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    if (argumentsList[0] === 'eth') {
      return target(...argumentsList);
    }
    return request(thisArg.currentProvider.host, rpcParams('cita_blockNumber'));
  }
};

export const getBlockHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    const hashOrNumber = argumentsList[0];
    if (hashOrNumber === 'eth') {
      return target(...argumentsList.slice(1));
    }

    if (hashOrNumber.length === 66) {
      return request(
        thisArg.currentProvider.host,
        rpcParams('cita_getBlockByHash', [
          hashOrNumber,
          argumentsList[1] || false
        ])
      );
    }

    return request(
      thisArg.currentProvider.host,
      rpcParams('cita_getBlockByNumber', [
        hashOrNumber,
        argumentsList[1] || false
      ])
    );
  }
};
