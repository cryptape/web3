"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const handers_1 = require("./handers");
const CITAWeb3 = (provider) => {
    const web3 = new web3_1.default(provider);
    web3.eth.getBlockNumber = new Proxy(web3.eth.getBlockNumber, handers_1.getBlockNumberHandler);
    web3.eth.sendTransaction = new Proxy(web3.eth.sendTransaction, handers_1.sendTransactionHandler);
    return web3;
};
exports.default = CITAWeb3;
