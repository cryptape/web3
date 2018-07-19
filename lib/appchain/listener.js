"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listener = (web3) => {
    const listeners = {
        listenToTransactionReceipt: (transactionHash, times = 10) => {
            return new Promise((resolve, reject) => {
                let remains = times;
                let listener = null;
                const stopWatching = () => {
                    clearInterval(listener);
                };
                listener = setInterval(() => {
                    if (!remains) {
                        stopWatching();
                        reject('No Receipt Receved');
                    }
                    web3.appchain
                        .getTransactionReceipt(transactionHash)
                        .then((res) => {
                        remains--;
                        if (res) {
                            clearInterval(listener);
                            resolve(res);
                        }
                    });
                }, 1000);
            });
        },
    };
    return Object.assign({}, web3, { listeners });
};
exports.default = listener;
