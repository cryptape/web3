"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pb = require('../../proto-ts/blockchain_pb.js');
const hexToBytes = (hex) => {
    let _hex = hex.startsWith('0x') ? hex.slice(2) : hex;
    var result = [];
    while (_hex.length >= 2) {
        result.push(parseInt(_hex.substring(0, 2), 16));
        _hex = _hex.substring(2, _hex.length);
    }
    return result;
};
exports.toHex = (num) => `0x${num.toString(16)}`;
exports.blockNumberFormatter = (num) => {
    if (typeof num === 'number') {
        return exports.toHex(num);
    }
    return num;
};
exports.hashFormatter = (hash) => hash.startsWith('0x') ? hash : `0x${hash}`;
exports.transactionContentParser = (content) => {
    const bytes = hexToBytes(content);
    const decoded = pb.UnverifiedTransaction.deserializeBinary(bytes);
    const tx = decoded.getTransaction();
    return {
        from: tx.getFrom ? tx.getFrom() : '',
        to: tx.getTo ? tx.getTo() : '',
        data: tx.getData ? tx.getData() : '',
        value: tx.getValue ? tx.getValue().toString() : ''
    };
};
exports.transactionParser = (transaction) => {
    if (transaction.content) {
        transaction.basicInfo = exports.transactionContentParser(transaction.content);
    }
    return transaction;
};
exports.blockParser = (block) => {
    block.body.transactions = block.body.transactions.map(tx => exports.transactionParser(tx));
    return block;
};
