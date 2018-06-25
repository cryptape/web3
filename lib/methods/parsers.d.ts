export declare type BlockNumber = string | number;
export declare type Hash = string;
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
  body: {
    transactions: Transaction[];
  };
}
export declare const toHex: (num: number) => string;
export declare const blockNumberFormatter: (num: string | number) => string;
export declare const hashFormatter: (hash: string) => string;
export declare const transactionContentParser: (
  content: string
) => {
  from: any;
  to: any;
  data: any;
  value: any;
};
export declare const transactionParser: (
  transaction: Transaction
) => Transaction;
export declare const blockParser: (block: Block) => Block;
