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
exports.sendTransactionHandler = {
    apply: function (target, thisArg, argumentsList) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = argumentsList[0];
            if (tx.quota) {
                if (typeof tx.validUntilBlock === 'undefined') {
                    tx.validUntilBlock = +(yield thisArg.getBlockNumber()).result + 88;
                }
                const unverifiedTransactionData = citaSignTransaction_1.default(tx);
                return axios_1.default
                    .post(thisArg.currentProvider.host, exports.rpcParams('cita_sendTransaction', [
                    unverifiedTransactionData.slice(2),
                ]))
                    .then((res) => res.data);
            }
            return target(...argumentsList);
        });
    },
};
exports.getBlockNumberHandler = {
    apply: function (target, thisArg, argumentsList) {
        if (argumentsList[0] === 'eth') {
            return target(...argumentsList);
        }
        return axios_1.default
            .post(thisArg.currentProvider.host, exports.rpcParams('cita_blockNumber'))
            .then((res) => res.data);
    },
};
