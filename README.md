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
