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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const citaSignTransaction_1 = __importDefault(require("../methods/citaSignTransaction"));
exports.randInt = () => Math.floor(Math.random() * 1000);
exports.rpcParams = (method, params = []) => ({
    jsonrpc: '2.0',
    method,
    params,
    id: exports.randInt(),
});
exports.handleRes = (res) => res.data;
exports.request = (host, params) => axios_1.default.post(host, params).then(exports.handleRes);
exports.sendTransactionHandler = {
    apply: function (target, thisArg, argumentsList) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = argumentsList[0];
            if (tx.quota) {
                if (typeof tx.validUntilBlock === 'undefined') {
                    tx.validUntilBlock = +(yield thisArg.getBlockNumber()).result + 88;
                }
                const unverifiedTransactionData = citaSignTransaction_1.default(tx);
                return exports.request(thisArg.currentProvider.host, exports.rpcParams('cita_sendTransaction', [unverifiedTransactionData]));
            }
            return target(...argumentsList);
        });
    },
};
exports.sendSignedTransactionHandler = {
    apply: function (target, thisArg, argumentsList) {
        return __awaiter(this, void 0, void 0, function* () {
            const signedTx = argumentsList[0];
            if (signedTx === 'eth') {
                return target(argumentsList[1]);
            }
            return exports.request(thisArg.currentProvider.host, exports.rpcParams('cita_sendWRawTransaction', [signedTx]));
        });
    },
};
exports.getBlockNumberHandler = {
    apply: function (target, thisArg, argumentsList) {
        if (argumentsList[0] === 'eth') {
            return target(...argumentsList);
        }
        return exports.request(thisArg.currentProvider.host, exports.rpcParams('cita_blockNumber'));
    },
};
exports.getBlockHandler = {
    apply: function (target, thisArg, argumentsList) {
        const hashOrNumber = argumentsList[0];
        if (hashOrNumber === 'eth') {
            return target(...argumentsList.slice(1));
        }
        if (hashOrNumber.length === 66) {
            return exports.request(thisArg.currentProvider.host, exports.rpcParams('cita_getBlockByHash', [
                hashOrNumber,
                argumentsList[1] || false,
            ]));
        }
        return exports.request(thisArg.currentProvider.host, exports.rpcParams('cita_getBlockByNumber', [
            hashOrNumber,
            argumentsList[1] || false,
        ]));
    },
};
exports.getTransactionHandler = {
    apply: function (target, thisArg, argumentsList) {
        if (argumentsList[0] === 'eth') {
            return target(argumentsList[1]);
        }
        return exports.request(thisArg.currentProvider.host, exports.rpcParams('cita_getTransaction', [argumentsList[0]]));
    },
};
exports.getMetaDataHandler = (host, number) => {
    return exports.request(host, exports.rpcParams('cita_getMetaData', [number]));
};
