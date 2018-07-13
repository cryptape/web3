"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signer_1 = __importDefault(require("@nervos/signer"));
var _ = require('underscore');
var formatters = require('web3-core-helpers').formatters;
var utils = require('web3-utils');
const peerCount = {
    name: 'peerCount',
    call: 'peerCount',
    params: 0,
};
const getMetaData = {
    name: 'getMetaData',
    call: 'getMetaData',
    params: 0,
    inputFormatter: [formatters.inputDefaultBlockNumberFormatter],
};
const getAbi = {
    name: 'getAbi',
    call: 'getAbi',
    params: 1,
};
const getTransactionReceipt = {
    name: 'getTransactionReceipt',
    call: 'getTransactionReceipt',
    params: 1,
    inputFormatter: [null],
    outputFormatter: formatters.outputTransactionReceiptFormatter,
};
const getCode = {
    name: 'getCode',
    call: 'getCode',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter,
    ],
};
const getAccounts = {
    name: 'getAccounts',
    call: 'accounts',
    params: 0,
    outputFormatter: utils.toChecksumAddress,
};
const getBalance = {
    name: 'getBalance',
    call: 'getBalance',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter,
    ],
    outputFormatter: utils.hexToNumberString,
};
var blockCall = function (args) {
    return _.isString(args[0]) && args[0].indexOf('0x') === 0
        ? 'getBlockByHash'
        : 'getBlockByNumber';
};
const getBlock = {
    name: 'getBlock',
    call: blockCall,
    params: 2,
    inputFormatter: [
        formatters.inputBlockNumberFormatter,
        function (val) {
            return !!val;
        },
    ],
    outputFormatter: formatters.outputBlockFormatter,
};
const getBlockByHash = {
    name: 'getBlockByHash',
    call: 'getBlockByHash',
    params: 2,
    inputFormatter: [
        formatters.inputBlockNumberFormatter,
        function (val) {
            return !!val;
        },
    ],
    outputFormatter: formatters.outputBlockFormatter,
};
const getBlockByNumber = {
    name: 'getBlockByNumber',
    call: 'getBlockByNumber',
    params: 2,
    inputFormatter: [
        formatters.inputBlockNumberFormatter,
        function (val) {
            return !!val;
        },
    ],
    outputFormatter: formatters.outputBlockFormatter,
};
const getBlockNumber = {
    name: 'getBlockNumber',
    call: 'blockNumber',
    params: 0,
    outputFormatter: utils.hexToNumber,
};
var getBlockTransactionCountCall = function (args) {
    return _.isString(args[0]) && args[0].indexOf('0x') === 0
        ? 'getBlockTransactionCountByHash'
        : 'getBlockTransactionCountByNumber';
};
const getBlockTransactionCount = {
    name: 'getBlockTransactionCount',
    call: getBlockTransactionCountCall,
    params: 1,
    inputFormatter: [formatters.inputBlockNumberFormatter],
    outputFormatter: utils.hexToNumber,
};
const getTransaction = {
    name: 'getTransaction',
    call: 'getTransactionByHash',
    params: 1,
    inputFormatter: [null],
    outputFormatter: formatters.outputTransactionFormatter,
};
const getTransactionCount = {
    name: 'getTransactionCount',
    call: 'getTransactionCount',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter,
    ],
    outputFormatter: utils.hexToNumber,
};
const getTransactionProof = {
    name: 'getTransactionProof',
    call: 'getTransactionProof',
    params: 1,
    inputFormatter: [formatters.inputAddressFormatter],
};
const sendSignedTransaction = {
    name: 'sendSignedTransaction',
    call: 'sendRawTransaction',
    params: 1,
    inputFormatter: [null],
};
const signTransaction = {
    name: 'signTransaction',
    call: 'signTransaction',
    params: 1,
    inputFormatter: [signer_1.default],
};
const sendTransaction = {
    name: 'sendTransaction',
    call: 'sendTransaction',
    params: 1,
    inputFormatter: [signer_1.default],
};
const newMessageFilter = {
    name: 'newMessageFilter',
    call: 'newFilter',
    params: 1,
};
const newBlockFilter = {
    name: 'newBlockFilter',
    call: 'newBlockFilter',
    params: 1,
};
const getFilterChanges = {
    name: 'getFilterChanges',
    call: 'getFilterChanges',
    params: 1,
};
const getFilterLogs = {
    name: 'getFilterLogs',
    call: 'getFilterLogs',
    params: 1,
};
const deleteMessageFilter = {
    name: 'deleteMessageFilter',
    call: 'uninstallFilter',
    params: 1,
};
const sign = {
    name: 'sign',
    call: 'sign',
    params: 2,
    inputFormatter: [
        signer_1.default,
    ],
    transformPayload: function (payload) {
        payload.params.reverse();
        return payload;
    },
};
const call = {
    name: 'call',
    call: 'call',
    params: 2,
    inputFormatter: [
        formatters.inputCallFormatter,
        formatters.inputDefaultBlockNumberFormatter,
    ],
};
exports.default = (web3) => {
    web3.extend({
        property: 'nervos',
        methods: [
            peerCount,
            getMetaData,
            getAbi,
            getCode,
            getBalance,
            getTransactionReceipt,
            getAccounts,
            getBlock,
            getBlockByHash,
            getBlockByNumber,
            getBlockNumber,
            getBlockTransactionCount,
            getTransaction,
            getTransactionCount,
            getTransactionProof,
            sendSignedTransaction,
            signTransaction,
            sendTransaction,
            sign,
            call,
            newMessageFilter,
            newBlockFilter,
            getFilterLogs,
            getFilterChanges,
            deleteMessageFilter,
        ],
    });
    return web3;
};
