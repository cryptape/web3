"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const handlers_1 = require("./handlers");
const citaSignTransaction_1 = __importDefault(require("./methods/citaSignTransaction"));
const parsers = __importStar(require("./methods/parsers"));
const NervosWeb3 = (provider, CustomWeb3 = web3_1.default) => {
    const web3 = new CustomWeb3(provider);
    web3.eth.getBlockNumber = new Proxy(web3.eth.getBlockNumber, handlers_1.getBlockNumberHandler);
    web3.eth.sendTransaction = new Proxy(web3.eth.sendTransaction, handlers_1.sendTransactionHandler);
    web3.eth.sendSignedTransaction = new Proxy(web3.eth.sendSignedTransaction, handlers_1.sendSignedTransactionHandler);
    web3.eth.getTransaction = new Proxy(web3.eth.getTransaction, handlers_1.getTransactionHandler);
    web3.eth.getBlock = new Proxy(web3.eth.getBlock, handlers_1.getBlockHandler);
    web3.eth.getTransactionReceipt = new Proxy(web3.eth.getTransactionReceipt, handlers_1.getTransactionReceiptHandler);
    web3.eth.getBalance = new Proxy(web3.eth.getBalance, handlers_1.getBalanceHandler);
    const cita = {
        getMetaData: (number = 'latest') => handlers_1.getMetaDataHandler(provider, number),
        sign: (tx) => citaSignTransaction_1.default(tx),
        parsers,
    };
    return Object.assign(web3, { cita });
};
exports.default = NervosWeb3;
