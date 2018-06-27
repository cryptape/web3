"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha3 = require('crypto-js/sha3');
'use strict';
var blockchain = require('../../proto-ts/blockchain_pb');
var Buffer = require('buffer').Buffer;
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var inputTransactionFormatterCita = function (options) {
    var tx = new blockchain.Transaction();
    if (!options.nonce) {
        throw new Error('nonce error');
    }
    tx.setNonce(options.nonce);
    if (options.quota <= 0) {
        throw new Error('quota must be more than 0');
    }
    tx.setQuota(options.quota);
    if (options.to) {
        tx.setTo(options.to);
    }
    if (!options.validUntilBlock) {
        throw new Error('vaild until block error');
    }
    tx.setValidUntilBlock(options.validUntilBlock);
    if (options.chainId < 0) {
        throw new Error('chain_id error');
    }
    tx.setChainId(options.chainId);
    tx.setData(new Uint8Array(Buffer.from(options.data, 'hex')));
    var msg = tx.serializeBinary();
    var hex = msg.reduce(function (r, a) {
        return r.concat(a.toString(16).padStart(2, '0'));
    }, '');
    var hash = sha3(hex, { encoding: 'hex' });
    var key = ec.keyFromPrivate(options.privkey, 'hex');
    var sign = key.sign(new Buffer(hash.toString(), 'hex'));
    var sign_r = sign.r.toString(16);
    var sign_s = sign.s.toString(16);
    if (sign_r.length == 63)
        sign_r = '0' + sign_r;
    if (sign_s.length == 63)
        sign_s = '0' + sign_s;
    var signature = sign_r + sign_s;
    var sign_buffer = new Buffer(signature, 'hex');
    var bytes = new Uint8Array(65);
    bytes.set(sign_buffer);
    bytes[64] = sign.recoveryParam;
    var tx2 = new blockchain.UnverifiedTransaction();
    tx2.setTransaction(tx);
    tx2.setCrypto(blockchain.Crypto.SECP);
    tx2.setSignature(bytes);
    var bytes = tx2.serializeBinary();
    var hexstr = bytes.reduce(function (r, a) {
        return r.concat(a.toString(16).padStart(2, '0'));
    }, '');
    hexstr = hexstr.slice(0, 2) == '0x' ? hexstr : '0x' + hexstr;
    return hexstr;
};
exports.default = inputTransactionFormatterCita;
