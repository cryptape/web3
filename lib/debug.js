"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const web3 = index_1.default('http://121.196.200.225:1337');
const transaction = {
    privateKey: '2c5c6c187d42e58a4c212a4aab0a3cfa4030256ed82bb3e05706706ab5be9641',
    from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
    nonce: 999999,
    quota: 1000000,
    chainId: 1,
    version: 0,
    validUntilBlock: 999999,
    value: '0x0',
};
web3.eth.sendTransaction(transaction).then(console.log);
