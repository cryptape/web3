"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
<<<<<<< HEAD
    });
    web3.appchain.Contract = web3.eth.Contract;
    web3.appchain.deploy = (bytecode, transaction) => __awaiter(this, void 0, void 0, function* () {
        const currentHeight = yield web3.eth
            .getBlockNumber()
            .then((res) => res.result);
        const tx = Object.assign({ version: 0, value: 0, nonce: Math.round(Math.random() * 10) }, transaction, { data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode, validUntilBlock: +currentHeight + 88 });
        const result = yield web3.eth
            .sendTransaction(tx)
            .then((res) => res.result);
        if (!result.hash) {
            return new Error('No Transaction Hash Received');
        }
        let remain = 10;
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                remain = remain - 1;
                if (remain > 0) {
                    web3.eth.getTransactionReceipt(result.hash).then((res) => {
                        if (res.result) {
                            clearInterval(interval);
                            resolve(res);
                        }
                    });
                }
                else {
                    reject('No Receipt Received');
                }
            }, 1000);
        });
=======
>>>>>>> master
    });
    web3.appchain.Contract = web3.eth.Contract;
    return web3;
};
