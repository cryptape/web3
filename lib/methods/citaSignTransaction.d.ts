export interface CITASendTransactionArugments {
  privkey: string;
  to?: string;
  nonce: string;
  quota: number;
  validUntilBlock: number;
  data: string;
  value: number;
  chainId: number;
  version: number;
  [index: string]: any;
}
export declare const dataFormatter: (hex: string) => Uint8Array;
declare const _default: (txParams: CITASendTransactionArugments) => string;
export default _default;
