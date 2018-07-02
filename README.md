![Build Status](https://travis-ci.org/CITA-Toys/web3.svg?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@nervos/web3)
[![npm type definitions](https://img.shields.io/npm/types/chalk.svg)](https://www.npmjs.com/package/@nervos/web3)
![npm](https://img.shields.io/npm/l/express.svg)

The Web3 for CITA

The majority of web3 keep update with official [web3](https://github.com/ethereum/web3.js/) and several methods below has been changed for CITA:

- web3.cita.getMetaData(blockNumber): Promise<Metadata>

- web3.cita.sign(transaction): SignedTransaction

- web3.cita.parsers.transactionContentParser(content): Transaction

- web3.cita.parsers.transactionParser(transactioBytes): UnverifiedTransaction

- web3.eth.getBlockNumber(chainType): Promise<BlockNumber>

- web3.eth.sendTransaction(transaction, chainType): Promise<TransactionReceipt>

- web3.eth.sendSignedTransaction(signedTransaction, chainType): Promise<TransactionReceipt>

- web3.eth.getTransaction(transactioHash, chainType): Promise<Transaction>

- web3.eth.getBlock(hashOrNumber, transactionInfo, chainType): Promise<Block>

- web3.eth.call(...args, eth): Response

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
 * @method cita
 * @param {object} transaction - transaction for CITA
 * @return {string} - SignedTransaction
 */
web3.cita.sign('transaction')

/**
 * @method transactionParser
 * @description parse unverified transaction
 * @param {object} unverifiedTransactionWithContent
 * @return {UnverifiedTransaction} UnverifiedTransactionWithTransactionObject
 */
web3.cita.parsers.transactionParser({
  hash: '0x88f20dcf69639fc8c4fc81664507d5febc7645b7fa01778cbcf82cec3abf3826',
  content:
    '0x0a680a283263633138333735663332613938656663303137643164646562636562643666396565373531353212103432353036616636633234383861623718c0843d20bc900532200000000000000000000000000000000000000000000000000de0b6b3a764000038011241f1be166145fa40a8f694da1e22861acd398d51a1c71d2763323a5c6415b7773d30fda2a307f715365ce62eda0f6a2e1e97e7599e1a4f34540c4f6a584f17711f00',
  blockNumber: '0x147ee',
  blockHash:
    '0x44a66acc5244606ce284bc7295273f3bad1aad5ab13465aa39bd093e6360f368',
  index: '0x0',
})

/**
 * @method transactionContentParser
 * @description parser transaction content to object
 * @param {string} transactionContent
 * @return {object} Transaction
 */
web3.cita.parsers.transactionContentParser(
  '0x0a680a283263633138333735663332613938656663303137643164646562636562643666396565373531353212103432353036616636633234383861623718c0843d20bc900532200000000000000000000000000000000000000000000000000de0b6b3a764000038011241f1be166145fa40a8f694da1e22861acd398d51a1c71d2763323a5c6415b7773d30fda2a307f715365ce62eda0f6a2e1e97e7599e1a4f34540c4f6a584f17711f00',
)

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
 * @param {object} transaction - transaction object with privateKey,
 *  for example {
 *   from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *   privateKey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
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
  privateKey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
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

/**
 * @method call
 * @param {object} args
 * @param {chainType}
 * @return {object} Response
 */
web3.eth.call('0x0').then(res => console.log(res))
```

### Deploy Contract

```javascript
const bytecode = '...'
const options = {
  value: 0,
  privateKey: '...',
  nonce: '01010',
  version: 0,
  quota: 99999,
}
web3.cita.deploy(bytecode, options).then(receipt => console.log(receipt))
```
