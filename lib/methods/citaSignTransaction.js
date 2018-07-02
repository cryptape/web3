"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_pb_1 = __importDefault(require("../../proto-ts/blockchain_pb"));
const EC = require('elliptic').ec;
const utils = require('web3-utils');
var CryptoJS = require('crypto-js');
var sha3 = require('crypto-js/sha3');
const ec = new EC('secp256k1');
exports.dataFormatter = (hex) => {
    hex = hex.startsWith('0x') ? hex : '0x' + hex;
    return new Uint8Array(utils.hexToBytes(hex));
};
exports.default = (txParams) => {
    const requires = ['nonce', 'quota', 'validUntilBlock', 'chainId', 'data'];
    const errors = requires
        .map(require => (txParams[require] === undefined ? require : null))
        .filter(error => error);
    if (errors.length)
        throw new Error(errors.join() + ' missed');
    let tx = new blockchain_pb_1.default.Transaction();
    if (txParams.to) {
        tx.setTo(txParams.to);
    }
    tx.setNonce('' + txParams.nonce);
    tx.setQuota(txParams.quota);
    tx.setValidUntilBlock(+txParams.validUntilBlock);
    tx.setData(exports.dataFormatter(txParams.data));
    tx.setValue('' + txParams.value);
    tx.setChainId(txParams.chainId);
    tx.setVersion(txParams.version);
    const msg = tx.serializeBinary();
    let hex = utils.bytesToHex(msg);
    if (hex.length > 2 && hex.substr(0, 2) === '0x') {
        hex = hex.substr(2);
    }
    hex = CryptoJS.enc.Hex.parse(hex);
    const hash = sha3(hex, {
        outputLength: 256,
    }).toString();
    const privkey = txParams.privkey.startsWith('0x')
        ? txParams.privkey.slice(2)
        : txParams.privkey;
    const key = ec.keyFromPrivate(privkey, 'hex');
    const buffer = new Buffer(hash.toString(), 'hex');
    const sign = key.sign(buffer);
    let sign_r = sign.r.toString(16);
    let sign_s = sign.s.toString(16);
    if (sign_r.length == 63)
        sign_r = '0' + sign_r;
    if (sign_s.length == 63)
        sign_s = '0' + sign_s;
    const signature = sign_r + sign_s;
    const sign_buffer = new Buffer(signature, 'hex');
    const bytes = new Uint8Array(65);
    bytes.set(sign_buffer);
    bytes[64] = sign.recoveryParam;
    const unverifiedTransaction = new blockchain_pb_1.default.UnverifiedTransaction();
    unverifiedTransaction.setTransaction(tx);
    unverifiedTransaction.setCrypto(blockchain_pb_1.default.Crypto.SECP);
    unverifiedTransaction.setSignature(bytes);
    const signedTx = utils.bytesToHex(unverifiedTransaction.serializeBinary());
    console.log('signed transaction: ');
    console.log(signedTx);
    return signedTx;
};
