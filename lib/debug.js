"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const SERVER = 'http://47.94.105.230:1337';
const web3 = index_1.default(SERVER);
const bytecode = '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029';
const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
bytecode;
console.log(abi);
const privkey = '0x2c5c6c187d42e58a4c212a4aab0a3cfa4030256ed82bb3e05706706ab5be9641';
const account = web3.eth.accounts.privateKeyToAccount(privkey);
account;
web3.eth.getBlockNumber().then(({ result }) => {
    const validUntilBlock = +result + 88;
    const chainId = 1;
    const tx = {
        privkey: account.privateKey,
        from: account.address,
        data: '0x' + bytecode,
        validUntilBlock,
        quota: 99999,
        chainId,
        to: account.address,
        nonce: 1000,
        value: '0',
        version: 0,
    };
    web3.eth.getBalance(account.address).then(({ result }) => {
        console.log('balance - quota');
        console.log(result - 99999);
    });
    web3.eth.sendTransaction(tx).then(({ result }) => {
        const { hash } = result;
        console.log(hash);
        setTimeout(() => {
            console.log(tx);
            web3.eth.getTransactionReceipt(hash).then(console.log);
        }, 10000);
    });
});