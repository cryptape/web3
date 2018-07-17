![Build Status](https://travis-ci.org/cryptape/web3.svg?branch=master)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/@nervos/web3)
[![npm type definitions](https://img.shields.io/npm/types/chalk.svg)](https://www.npmjs.com/package/@nervos/web3)
![npm](https://img.shields.io/npm/l/express.svg)

# Getting Started

`@nervos/web3` is a high-order function takes `provider` and `Web3 Class`(optional) as inputs, returns nervos-supported web3 instance.

To use `@nervos/web3', you can add it via npm

```shell
yarn add @nervos/web3
```

or to link it in browser directly with

```html
<script src="node_modules/@nervos/web3/lib/bundle.js" />
```

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

### sign

```javascript
/**
 * @method sign
 * @desc sign message in wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @return {Promise<string>} Promise returns signed message
 */

nervos.appchain.sign(message, address)
```

### personal.sign

```javascript
/**
 * @method personal.sign
 * @desc sign message in wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @param {string} - password of specified account
 * @return {Promise<string>} Promise returns signed message
 */

nervos.appchain.personal.sign(message, address, password)
```

### sendTransaction

```javascript
/**
 * @method sendTransaction
 * @desc send transaction to appchain, if transaction including `privateKey`, it will sign the transaction locally, otherwise the transaction will be send to node and signed remote.
 * @param {object} - transaction object
 * @return {Promise<object>} Promise returns transaction hash
 */

nervos.appchain.sendTransaction(transaction)
```

### sendSignedTransaction

```javascript
/**
 * @method sendSignedTransaction
 * @desc send signed transaction to appchain
 * @param {string} - signed transaction message
 * @return {Promise<object>} Promise returns transaction hash
 */

nervos.appchain.sendSignedTransaction(signedTransaction)
```

### getTransactionReceipt

```javascript
/**
 * @method getTransactionReceipt
 * @desc inquire transaction receipt
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction receipt
 */

nervos.appchain.sendSignedTransaction(signedTransaction)
```

### getTransaction

```javascript
/**
 * @method getTransaction
 * @desc inquire transaction
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction
 */

nervos.appchain.getTransaction(transactionHash)
```

## Contract Reference

### Deploy Contract

```javascript
const bytecode =
  '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029'
const privateKey = '0x...........'
const transaction = {
  from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
  privateKey,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: '0x0',
}
web3.appchain.deploy(bytecode, tx)
```

### Invoke Contract

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)
const contract = new nervos.appchain.Contract(abi, contractAddress)

// call method
contract.methods.get().call()

// send method
contract.methods.set(5).send(transaction)
```
