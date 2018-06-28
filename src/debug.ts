import NervosWeb3 from './index';

const SERVER = 'localhost:1337';

const web3 = NervosWeb3(SERVER);

const bytecode =
  '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029';
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'
);
const privkey =
  '0x6df169367e91caab0f63120aeb296fce34fd21e95dedd635f2d0cce3f5c8e47f ';
// new web3.eth.Contract(abi, bytecode)
const tx = {
  privkey,
  data: bytecode,
  quota: 9999999,
  nonce: 1000,
  value: '0',
  version: 0
};
web3.cita.deploy(bytecode, tx).then(console.log);
