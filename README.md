![Build Status](https://travis-ci.org/CITA-Toys/web3.svg?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@nervos/web3)
[![npm type definitions](https://img.shields.io/npm/types/chalk.svg)](https://www.npmjs.com/package/@nervos/web3)
![npm](https://img.shields.io/npm/l/express.svg)

The Web3 for CITA

The methods below has been updated for CITA:

- web3.cita.getMetaData(blockNumber): Promise<Metadata>

- web3.cita.CITASendTransactionArugments(transaction): SignedTransaction

- web3.eth.getBlockNumber(chainType): Promise<BlockNumber>

- web3.eth.sendTransaction(transaction, chainType): Promise<TransactionReceipt>

- web3.eth.sendSignedTransaction(signedTransaction, chainType): Promise<TransactionReceipt>

- web3.eth.getTransaction(transactioHash, chainType): Promise<Transaction>

- web3.eth.getBlock(hashOrNumber, transactionInfo, chainType): Promise<Block>

```javascript
const NervosWeb3 = require('@nervos/web3')
const chain = 'http://localhost:1337'
const web3 = NervosWeb3.default(chain)

/**
 * @method getMetaData
 * @returns {Promise<Metadata>} - {
 *   jsonrpc: '2.0',
 *   id: 415,
 *   result: {
 *     chainId: 1,
 *     chainName: 'test-chain',
 *     operator: 'test-operator',
 *     website: 'https://www.example.com',
 *     genesisTimestamp: 1527476862041,
 *     validators: [
 *       '0xdd8cb10979ba055a488faf5dd9417455d6533ed4',
 *       '0x3ef7d94d12e6c70bebaefcff8ca4c3f107e5fff9',
 *       '0x54f5a9c0535b91c8654fc73b61a46eae0437fcbd',
 *       '0xdf696f464759368dab16112fa881b19801a0df62'
 *     ],
 *     blockInterval: 3000
 *   }
 * }
 */

web3.cita.getMetaData().then(res => {
  console.log(res)
})

/**
 * @method citaSignTransaction
 * @param {object} transaction - transaction for CITA
 * @return {string} - SignedTransaction
 */
web3.cita.citaSignTransaction('transaction')

/**
 * @method getBlockNumber
 * @param {string} [chainType] - If chainType === 'eth', returns block number of Ethereum
 * @returns {Promise<BlockNumber>} - {
 *   jsonrpc: "2.0",
 *   id: "1",
 *   result: "0x0"
 * }
 */

web3.eth.getBlockNumber().then(res => {
  console.log(res)
})

/**
 * @method getBlock
 * @param {string} hashOrNumber - Hash or Number of Block
 * @param {boolean} [transactionInfo] - If true, return block with trnasaction content, else return block with transaction hash
 * @param {string} [chainType] - if chainType === 'eth', request block of Ethereum
 * @returns {Promise<Block>} - {
 *   jsonrpc: "2.0",
 *   id: "1",
 *   result: block
 * }
 */

web3.eth.getBlock('blockNumberOrHash').then(res => {
  console.log(res)
})

/**
 * @method sendTransaction
 * @param {object} transaction - transaction object with privkey,
 *  for example {
 *   from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *   privkey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *   nonce: 100,
 *   quota: 100,
 *   data: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *   value: 0,
 *   chainId: 1,
 *   version: 0
 * }
 * You can also use it as native sendTransaction with standard ethereum transaction
 * @return {Promise<TransactionReceipt>} - {
 *   jsonprc: "2.0",
 *   id: "1",
 *   result: {
 *     hash: "0x...",
 *     status: "OK"
 *   }
 * }
 */

const tx = {
  from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  privkey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  nonce: 100,
  quota: 100,
  data: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
  value: 0,
  chainId: 1,
  version: 0,
}

web3.eth.sendTransaction(tx).then(res => {
  console.log(res)
})

/**
 * @method getTransaction
 * @param {string} transactionHash - Hash of transaction
 * @param {string} [chainType] - if chainType === 'eth', request transaction of Ethereum
 * @return {Promise<Transaction>} - {
 *   jsonrpc: "2.0",
 *   id: "1",
 *   result: transaction
 * }
 */

web3.eth.getTransaction('transactionHash').then(res => {
  console.log(res)
})

/**
 * @method sendSignedTransaction
 * @param {string} signedTransaction - Signed Transaction
 * @param {string} [chainType] - if chainType === 'eth', request transaction of Ethereum
 * @return {Promise<TransactionReceipt>}
 */
web3.eth.sendSignedTransaction('signedTransaction').then(res => {
  console.log(res)
})
```
