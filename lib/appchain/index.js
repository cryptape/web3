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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signer_1 = __importStar(require("@nervos/signer"));
const rpc = __importStar(require("./rpc"));
const personal = __importStar(require("./neuron"));
const listener_1 = __importDefault(require("./listener"));
const addPrivateKey_1 = __importDefault(require("../utils/addPrivateKey"));
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
    web3.appchain.Contract = web3.eth.Contract;
    web3 = listener_1.default(web3);
    web3.appchain.signer = signer_1.default;
    web3.appchain.unsigner = signer_1.unsigner;
    web3.appchain.deploy = (bytecode, transaction) => __awaiter(this, void 0, void 0, function* () {
        const currentHeight = yield web3.appchain
            .getBlockNumber()
            .catch((err) => {
            console.error(err);
        });
        const _tx = Object.assign({ version: 0, value: 0, nonce: Math.round(Math.random() * 10) }, transaction, { data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode, validUntilBlock: +currentHeight + 88 });
        const tx = addPrivateKey_1.default(web3.eth.accounts.wallet)(_tx);
        const result = yield web3.appchain.sendTransaction(tx).catch((err) => {
            throw new Error(err);
        });
        if (!result.hash) {
            return new Error('No Transaction Hash Received');
        }
        return web3.listeners.listenToTransactionReceipt(result.hash);
    });
    web3.appchain.storeAbi = (address, abi) => __awaiter(this, void 0, void 0, function* () {
        if (!address) {
            throw new Error('Store ABI needs contract address');
        }
        if (typeof abi !== 'string') {
            throw new Error('ABI should be string');
        }
        const currentHeight = yield web3.appchain
            .getBlockNumber()
            .catch((err) => {
            console.error(err);
        });
        const privateKey = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
        const hexedABI = '73552bc4e960a1d53013b40074569ea05b950b4d4ed3885e000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001275b7b22636f6e7374616e74223a66616c73652c22696e70757473223a5b7b226e616d65223a2278222c2274797065223a2275696e74323536227d5d2c226e616d65223a22736574222c226f757470757473223a5b5d2c2270617961626c65223a66616c73652c2273746174654d75746162696c697479223a226e6f6e70617961626c65222c2274797065223a2266756e6374696f6e227d2c7b22636f6e7374616e74223a747275652c22696e70757473223a5b5d2c226e616d65223a22676574222c226f757470757473223a5b7b226e616d65223a22222c2274797065223a2275696e74323536227d5d2c2270617961626c65223a66616c73652c2273746174654d75746162696c697479223a2276696577222c2274797065223a2266756e6374696f6e227d5d00000000000000000000000000000000000000000000000000';
        const abiAddr = '0xffffffffffffffffffffffffffffffffff010001';
        const tx = {
            privateKey,
            version: 0,
            value: 0,
            to: abiAddr,
            nonce: Math.round(Math.random() * 10),
            data: hexedABI,
            validUntilBlock: +currentHeight + 88,
            quota: 89999,
        };
        const txResult = yield web3.appchain.sendTransaction(tx);
        console.log(txResult);
        const txReceipt = yield web3.listeners.listenToTransactionReceipt(txResult.hash);
        console.log(txReceipt);
    });
    const neuron = {
        sign: web3.appchain.neuron_sign,
    };
    web3.appchain.personal = neuron;
    return web3;
};
