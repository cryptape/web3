// import { Transaction, Block } from '../typings'
export type BlockNumber = string | number;
export type Hash = string;
export interface Transaction {
  blockHash: Hash;
  blockNumber: BlockNumber;
  content?: string;
  basicInfo?:
    | string
    | {
        from: string;
        to: string;
        value: string;
        data: string;
      };
  hash: Hash;
  index: string;
}
export interface Block {
  body: { transactions: Transaction[] };
}

const pb = require('../../proto-ts/blockchain_pb.js');

const hexToBytes = (hex: string) => {
  let _hex = hex.startsWith('0x') ? hex.slice(2) : hex;
  var result = [];
  while (_hex.length >= 2) {
    result.push(parseInt(_hex.substring(0, 2), 16));
    _hex = _hex.substring(2, _hex.length);
  }
  return result;
};

export const toHex = (num: number) => `0x${num.toString(16)}`;
export const blockNumberFormatter = (num: string | number) => {
  if (typeof num === 'number') {
    return toHex(num);
  }
  return num;
};
export const hashFormatter = (hash: string) =>
  hash.startsWith('0x') ? hash : `0x${hash}`;

export const transactionContentParser = (content: string) => {
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

export const transactionParser = (transaction: Transaction) => {
  if (transaction.content) {
    transaction.basicInfo = transactionContentParser(transaction.content);
  }
  return transaction;
};

export const blockParser = (block: Block) => {
  block.body.transactions = block.body.transactions.map(tx =>
    transactionParser(tx)
  );
  return block;
};
