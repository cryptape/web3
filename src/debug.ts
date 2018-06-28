import NervosWeb3 from './index';

// const Contract = require('web3-eth-contract')
const SERVER = 'http://47.94.105.230:1337';

const web3 = NervosWeb3(SERVER);

// const bytecode =
//   '608060405234801561001057600080fd5b5060405160208061025e83398101604090815290513360009081526020819052919091205561021a806100446000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166327e235e3811461005b578063a9059cbb1461009b578063f8b2cb4f146100e0575b600080fd5b34801561006757600080fd5b5061008973ffffffffffffffffffffffffffffffffffffffff6004351661010e565b60408051918252519081900360200190f35b3480156100a757600080fd5b506100cc73ffffffffffffffffffffffffffffffffffffffff60043516602435610120565b604080519115158252519081900360200190f35b3480156100ec57600080fd5b5061008973ffffffffffffffffffffffffffffffffffffffff600435166101c6565b60006020819052908152604090205481565b33600090815260208190526040812054821180159061013f5750600082115b156101bc57336000818152602081815260408083208054879003905573ffffffffffffffffffffffffffffffffffffffff871680845292819020805487019055805186815290519293927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060016101c0565b5060005b92915050565b73ffffffffffffffffffffffffffffffffffffffff16600090815260208190526040902054905600a165627a7a72305820fd53fb0044f74a7f632feb9f4f2e017872facfe73a8043a0a6b1582fc02752bf0029';
// const abi = JSON.parse(
//   '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'
// );

const addr = '0xf15b4787541175a1750390e6b74fde45359240dd';
const abi = [
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'account', type: 'address' }],
    name: 'getBalance',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'supplyAmount', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: '_from', type: 'address' },
      { indexed: true, name: '_to', type: 'address' },
      { indexed: false, name: '_value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  }
];
web3.cita.contract(abi, addr).then(contract => {
  console.log(
    web3.cita.createTxObject('0xf15b4787541175a1750390e6b74fde45359240dd')
  );
  contract;
});
