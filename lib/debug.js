"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const SERVER = 'http://47.94.105.230:1337';
const web3 = index_1.default(SERVER);
const addr = '0xf15b4787541175a1750390e6b74fde45359240dd';
const abi = [
    {
        constant: true,
        inputs: [{ name: '', type: 'address' }],
        name: 'balances',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [{ name: 'account', type: 'address' }],
        name: 'getBalance',
        outputs: [{ name: 'balance', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: 'supplyAmount', type: 'uint256' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: '_from', type: 'address' },
            { indexed: true, name: '_to', type: 'address' },
            { indexed: false, name: '_value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
    },
];
web3.cita.contract(abi, addr).then(contract => {
    console.log(web3.cita.createTxObject('0xf15b4787541175a1750390e6b74fde45359240dd'));
    contract;
});
