![Build Status](https://travis-ci.org/CITA-Toys/web3.svg?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@nervos/web3)
[![npm type definitions](https://img.shields.io/npm/types/chalk.svg)](https://www.npmjs.com/package/@nervos/web3)
![npm](https://img.shields.io/npm/l/express.svg)

The Web3 for CITA

```javascript
const CITAWeb3 = require('@cita/web3')
const chain = 'http://localhost:1337'
const webe = CITAWeb3.default(chain)

/**
 * @method getMetaData
 * @returns {object} - {
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
 * @method getBlockNumber
 * @param {string} isEth - optional, if isEth == 'eth', returns block number of ethereum
 * @returns {object} - {
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
 * @param {string} hashOrNumber - if hashOrNumber == 'eth', require the second param and returns block from ethereum
 * @param {string} hashOrNumber - required when previous param == 'eth'
 * @returns {object} {
 *   jsonrpc: "2.0",
 *   id: "1",
 *   result: block
 * }
 */

web3.eth.getBlock('blockNumber or blockHash').then(res => {
  console.log(res)
})

/**
 * @method sendTransaction
 * @param {object} tx - transaction object with privkey, for example {
 *  from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *  privkey: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *  nonce: 100,
 *  quota: 100,
 *  data: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
 *  value: 0,
 *  chainId: 1,
 *  version: 0
 * }
 * You can also use it as native sendTransaction
 * @return {object} - {
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
 * @param {string} transactionHash - if transactionHash == 'eth', require the second param
 * @param {string} transactionHash
 * @return {object} - {
 *   jsonrpc: "2.0",
 *   id: "1",
 *   result: transaction
 * }
 */

web3.eth.getTransaction(tx).then(res => {
  console.log(res)
})
```
