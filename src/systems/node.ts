import { request, rpcParams } from '../handlers';

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
  private host: any;
  // private encodeParameter: any
  private web3: any;
  private address = '0x00000000000000000000000000000000013241a2';
  private signatures = {
    approveNode: 'dd4c97a0',
    deleteNode: '2d4ede93',
    getStatus: '30ccebb5',
    listNode: '609df32f',
    newNode: 'ddad2ffe',
    status: '645b8b1b'
  };
  constructor(host: string | { host: string }, web3: any) {
    this.host = host;
    // this.encodeParameter = encodeParameter
    this.web3 = web3;
  }

  /**
   * @method listNode
   */
  public listNode = () => {
    return request(
      this.host,
      rpcParams('call', [
        {
          to: this.address,
          data: '0x' + this.signatures.listNode
        },
        'latest'
      ])
    );
  };

  /**
   * @method newNode
   */
  public newNode = (addr: string, tx: any = transaction) => {
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
  /**
   * @method approveNode
   */
  public approveNode = (addr: string, tx: any = transaction) => {
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
  /**
   * @method deleteNode
   */
  public deleteNode = (addr: string, tx: any = transaction) => {
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
  public getStatus = (addr: string) => {
    const cttAddr = this.signatures.getStatus;
    const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);

    return request(
      this.host,
      rpcParams('call', [
        {
          to: this.address,
          data: '0x' + cttAddr + params
        },
        'latest'
      ])
    );
  };
  public status = (addr: string) => {
    const cttAddr = this.signatures.status;
    const params = this.web3.eth.abi.encodeParameter('address', addr).slice(2);

    return request(
      this.host,
      rpcParams('call', [
        {
          to: this.address,
          data: '0x' + cttAddr + params
        },
        'latest'
      ])
    );
  };
}
export default NodeMange;
