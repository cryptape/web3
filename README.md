![Build Status](https://travis-ci.org/cryptape/web3.svg?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@nervos/web3)
[![npm type definitions](https://img.shields.io/npm/types/chalk.svg)](https://www.npmjs.com/package/@nervos/web3)
![npm](https://img.shields.io/npm/l/express.svg)

# Getting Started

`@nervos/web3` is a high-order function takes `provider` and `Web3 Class`(optional) as inputs, returns nervos-supported web3 instance.

# Add `nervos.js`

```javascript
import Nervos from '@nervos/web3'
const nervos = Nervos('http://localhost:1337')
```

# AppChain

`nervos.appchain` allows you to interact with an Nervos Appchain and Nervos Smart Contract.

## ABI Reference

### peerCount

```javascript
/**
 * @method peerCount
<<<<<<< HEAD
 * @desc inqure peer count of appchain
=======
 * @desc inquire peer count of appchain
>>>>>>> e45d9e4... update: add rpc docs
 * @param null
 * @return {Promise<string>} Promise returns peer count
 */
nervos.appchain.peerCount()
```

### getMetaData

```javascript
/**
 * @method getMetaData
 * @desc inquire metadata of appchain, including `chainId`, `chainName`, `operator`, `website`, `genesisTimestamp`, `validators`, `blockInterval`, `tokenName`, `tokenSymbol`, `tokenAvatar`
 * @param null
 * @return {Promise<object>} Promise returns metadata
 */
nervos.appchain.getMetaData()
```

### getAbi

```javascript
// TODO:
```

### getCode

```javascript
// TODO
```

### getBalance

```javascript
/**
 * @method getBalance
 * @param {string} - account address
 * @return {Promise<BN>} Promise returns balance
 */
nervos.appchain.getBalance('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### getAccounts

```javascript
// TODO:
```

### getBlock

```javascript
/**
 * @method getBlock
 * @param {string|number} - block hash or block number
 * @return {Promise<Block>} Promise returns block
 */
nervos.appchain.getBlock(0)
```

### getBlockByNumber

```javascript
/**
 * @method getBlockByNumber
 * @param {number} - block number
 * @return {Promise<Block>} Promise returns block
 */
nervos.appchain.getBlockByNumber(0)
```

### getBlockByHash

```javascript
/**
 * @method getBlockByHash
 * @param {string} - block hash
 * @return {Promise<Block>} Promise returns block
 */
nervos.appchain.getBlockByHash(
  '0x0c56def738d15d9dfaad64ad246e8b5fe39e175ce3da308ea1018869522a1a4d',
)
```

### getBlockNumber

```javascript
/**
 * @method getBlockNumber
 * @param null
 * @return {Promise<number>} Promise returns current block number
 */
nervos.appchain.getBlockNumber()
```

### getBlockTransactionCount

```javascript
// TODO:
```

### getTransactionCount

```javascript
/**
 * @method getTransactionCount
 * @param {string} - account address
 * @return {Promise<number>} Promise returns transaction count of account address
 */
nervos.appchain.getTransactionCount(
  '0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7',
)
```

### newMessageFilter

```javascript
/**
 * @method newMessageFilter
 * @param {object} - topics object
 * @return {Promise<string>} Promise returns filter id
 */

const topics = {
  topics: [
    '0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3',
  ],
}
nervos.appchain.newMessageFilter(topics)
```

### newBlockFilter

```javascript
/**
 * @method newBlockFilter
 * @param null
 * @return {Promise<string>} Promise returns filter id
 */

nervos.appchain.newBlockFilter()
```

### getFilterChanges

```javascript
/**
 * @method getFilterChanges
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

nervos.appchain.getFilterChanges('0x1')
```

### getFitlerLogs

```javascript
/**
 * @method getFitlerLogs
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

nervos.appchain.getFitlerLogs('0x1')
```

### deleteMessageFilter

```javascript
/**
 * @method deleteMessageFilter
 * @param {string} - filter id
 * @return {Promise<boolean>} Promise returns success
 */

nervos.appchain.deleteMessageFilter('0x1')
```
