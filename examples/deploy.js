const NervosWeb3 = require('../lib');
const SERVER = 'localhost:1337';
const web3 = NervosWeb3.default(SERVER);

web3.eth.sendTransaction(tx).then(console.log)
