"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpc = __importStar(require("./rpc"));
const personal = __importStar(require("./personal"));
exports.default = (web3) => {
    web3.extend({
        property: 'appchain',
        methods: [
            rpc.peerCount,
            rpc.getMetaData,
            rpc.getAbi,
            rpc.getCode,
            rpc.getBalance,
            rpc.getTransactionReceipt,
            rpc.getAccounts,
            rpc.getBlock,
            rpc.getBlockByHash,
            rpc.getBlockByNumber,
            rpc.getBlockNumber,
            rpc.getBlockTransactionCount,
            rpc.getTransaction,
            rpc.getTransactionCount,
            rpc.getTransactionProof,
            rpc.sendSignedTransaction,
            rpc.signTransaction,
            rpc.sendTransaction,
            rpc.sign,
            rpc.call,
            rpc.newMessageFilter,
            rpc.newBlockFilter,
            rpc.getFilterLogs,
            rpc.getFilterChanges,
            rpc.deleteMessageFilter,
            rpc.getLogs,
            personal.getAccounts,
            personal.newAccount,
            personal.sign,
            personal.ecRecover,
        ],
    });
    return web3;
};
