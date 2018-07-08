"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../handlers");
const transaction = {
    from: '',
    nonce: 999999,
    quota: 1000000,
    chainId: 1,
    version: 0,
    validUntilBlock: 999999,
    value: '0x0'
};
class NodeMange {
    constructor(host, web3) {
        this.address = '0x00000000000000000000000000000000013241a2';
        this.signatures = {
            approveNode: 'dd4c97a0',
            deleteNode: '2d4ede93',
            getStatus: '30ccebb5',
            listNode: '609df32f',
            newNode: 'ddad2ffe',
            status: '645b8b1b'
        };
        this.listNode = () => {
            return handlers_1.request(this.host, handlers_1.rpcParams('call', [
                {
                    to: this.address,
                    data: '0x' + this.signatures.listNode
                },
                'latest'
            ]));
        };
        this.newNode = (addr, tx = transaction) => {
            const cttAddr = this.signatures.newNode;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            tx.data = cttAddr + params;
            tx.to = this.address;
            if (!tx.privateKey && !this.web3.eth.accounts.wallet[0]) {
                return new Error('Need privateKey');
            }
            tx.privateKey =
                tx.privateKey || this.web3.eth.accounts.wallet[0].privateKey;
            return this.web3.eth.sendTransaction(tx);
        };
        this.approveNode = (addr, tx = transaction) => {
            const cttAddr = this.signatures.approveNode;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            tx.data = cttAddr + params;
            tx.to = this.address;
            if (!tx.privateKey && !this.web3.eth.accounts.wallet[0]) {
                return new Error('Need privateKey');
            }
            tx.privateKey =
                tx.privateKey || this.web3.eth.accounts.wallet[0].privateKey;
            return this.web3.eth.sendTransaction(tx);
        };
        this.deleteNode = (addr, tx = transaction) => {
            const cttAddr = this.signatures.deleteNode;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            tx.data = cttAddr + params;
            tx.to = this.address;
            if (!tx.privateKey && !this.web3.eth.accounts.wallet[0]) {
                return new Error('Need privateKey');
            }
            tx.privateKey =
                tx.privateKey || this.web3.eth.accounts.wallet[0].privateKey;
            return this.web3.eth.sendTransaction(tx);
        };
        this.getStatus = (addr) => {
            const cttAddr = this.signatures.getStatus;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            return handlers_1.request(this.host, handlers_1.rpcParams('call', [
                {
                    to: this.address,
                    data: '0x' + cttAddr + params
                },
                'latest'
            ]));
        };
        this.status = (addr) => {
            const cttAddr = this.signatures.status;
            const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);
            return handlers_1.request(this.host, handlers_1.rpcParams('call', [
                {
                    to: this.address,
                    data: '0x' + cttAddr + params
                },
                'latest'
            ]));
        };
        this.host = host;
        this.web3 = web3;
    }
}
exports.default = NodeMange;
