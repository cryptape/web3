"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const node_1 = __importDefault(require("./systems/node"));
const web3_plugin_1 = __importDefault(require("@nervos/web3-plugin"));
const signer_1 = __importDefault(require("@nervos/signer"));
const Contract = require('web3-eth-contract');
const handlers_1 = require("./handlers");
const callContract_1 = __importDefault(require("./methods/callContract"));
const contract_1 = __importDefault(require("./contract"));
const parsers = __importStar(require("./methods/parsers"));
const NervosWeb3 = (provider, CustomWeb3 = web3_1.default) => {
    const web3 = new CustomWeb3(provider);
    const { Nervos: plugins } = web3_plugin_1.default({
        server: typeof provider === 'string' ? provider : provider.host,
    });
    web3.eth.Contract.prototype._executeMethod = contract_1.default;
    web3.eth.getBlockNumber = new Proxy(web3.eth.getBlockNumber, handlers_1.getBlockNumberHandler);
    web3.eth.sendTransaction = new Proxy(web3.eth.sendTransaction, handlers_1.sendTransactionHandler);
    web3.eth.sendSignedTransaction = new Proxy(web3.eth.sendSignedTransaction, handlers_1.sendSignedTransactionHandler);
    web3.eth.getTransaction = new Proxy(web3.eth.getTransaction, handlers_1.getTransactionHandler);
    web3.eth.getBlock = new Proxy(web3.eth.getBlock, handlers_1.getBlockHandler);
    web3.eth.getTransactionReceipt = new Proxy(web3.eth.getTransactionReceipt, handlers_1.getTransactionReceiptHandler);
    web3.eth.getBalance = new Proxy(web3.eth.getBalance, handlers_1.getBalanceHandler);
    web3.eth.call = new Proxy(web3.eth.call, handlers_1.callHandler);
    const cita = Object.assign({}, plugins, { storeAbi: (addr, abiBytes) => __awaiter(this, void 0, void 0, function* () {
            const { chainId } = (yield plugins.metadata({
                blockNumber: 'latest',
            }));
            const currentHeight = yield web3.eth
                .getBlockNumber()
                .then((res) => res.result);
            const bytecode = addr + abiBytes;
            const tx = {
                to: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                quota: 999999,
                version: 0,
                value: 0,
                nonce: Math.round(Math.random() * 10),
                data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
                validUntilBlock: +currentHeight + 88,
                chainId,
            };
            return web3.eth.sendTransaction(tx);
        }), createTxObject: Contract.prototype._createTxObject, callContract: callContract_1.default(web3), sign: signer_1.default,
        parsers, contract: (abi, addr) => __awaiter(this, void 0, void 0, function* () {
            const myContract = new web3.eth.Contract(abi, addr);
            return myContract;
        }), deploy: (bytecode, transaction) => __awaiter(this, void 0, void 0, function* () {
            const { chainId } = (yield plugins.metadata({
                blockNumber: 'latest',
            }));
            const currentHeight = yield web3.eth
                .getBlockNumber()
                .then((res) => res.result);
            const tx = Object.assign({ quota: 999999, version: 0, value: 0, nonce: Math.round(Math.random() * 10) }, transaction, { data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode, validUntilBlock: +currentHeight + 88, chainId });
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
        }) });
    const system = {
        node: new node_1.default(provider, web3),
    };
    const target = Object.assign(web3, { cita, system });
    return target;
};
exports.default = NervosWeb3;
