"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (wallet) => (transaction) => {
    if (transaction.privateKey &&
        typeof +transaction.privateKey === 'number' &&
        wallet.length &&
        +transaction.privateKey >= 0 + transaction.privateKey < wallet.length) {
        transaction.privateKey = wallet[+transaction.privateKey].privateKey;
        transaction.from = wallet[+transaction.privateKey].address;
    }
    if (!transaction.privateKey && wallet.length) {
        transaction.privateKey = wallet[0].privateKey;
        transaction.from = wallet[0].from;
    }
    return transaction;
};
