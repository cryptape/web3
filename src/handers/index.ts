import axios, { AxiosResponse } from "axios";
import citaSignTransaction from "../methods/citaSignTransaction";

export const randInt = () => Math.floor(Math.random() * 1000);

export const rpcParams = (method: string, params: string[] = []) => ({
  jsonrpc: "2.0",
  method,
  params,
  id: randInt()
});

/**
 * @method sendCitaTransaction
 */
export const sendTransactionHandler = {
  apply: async function(target: Function, thisArg: any, argumentsList: any) {
    const tx = argumentsList[0];

    if (tx.quota) {
      if (typeof tx.validUntilBlock === "undefined") {
        tx.validUntilBlock = +(await thisArg.getBlockNumber()).result + 88;
      }
      const unverifiedTransactionData = citaSignTransaction(tx);
      return axios
        .post(
          thisArg.currentProvider.host,
          rpcParams("cita_sendTransaction", [
            unverifiedTransactionData.slice(2)
          ])
        )
        .then((res: AxiosResponse) => res.data);
    }
    return target(...argumentsList);
  }
};

/**
 * @method getCitaBlockNumber
 */
export const getBlockNumberHandler = {
  apply: function(target: Function, thisArg: any, argumentsList: any) {
    if (argumentsList[0] === "eth") {
      return target(...argumentsList);
    }
    return axios
      .post(thisArg.currentProvider.host, rpcParams("cita_blockNumber"))
      .then((res: AxiosResponse) => res.data);
  }
};
