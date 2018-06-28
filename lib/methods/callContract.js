"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.default = (web3) => (method, params) => {
    const host = web3.eth.currentProvider;
    return axios_1.default.post(host, {
        type: 'call_contract',
        method,
        params,
    });
};
