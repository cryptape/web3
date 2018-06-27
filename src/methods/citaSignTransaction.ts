/*
    This file is part of web3.js.
    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file sha3.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var sha3 = require('crypto-js/sha3');

'use strict';

// var sha3 = require('../utils/sha3.js')
// var secp256k1 = require('secp256k1');
var blockchain = require('../../proto-ts/blockchain_pb');
// var utils = require('../utils/utils')
var Buffer = require('buffer').Buffer;

var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

/**
 * Formats the input of a CITA transaction which contains signature
 *
 * @method inputTransactionFormatterCita
 * @param {Object} transaction options
 * @returns protobuf of signed transaction
 */
var inputTransactionFormatterCita = function(options) {
  // create Transaction
  var tx = new blockchain.Transaction();
  if (!options.nonce) {
    throw new Error('nonce error');
  }
  tx.setNonce(options.nonce);

  if (options.quota <= 0) {
    throw new Error('quota must be more than 0');
  }
  tx.setQuota(options.quota);

  if (options.to) {
    tx.setTo(options.to);
  }

  if (!options.validUntilBlock) {
    throw new Error('vaild until block error');
  }
  tx.setValidUntilBlock(options.validUntilBlock);

  if (options.chainId < 0) {
    throw new Error('chain_id error');
  }
  tx.setChainId(options.chainId);

  // if (options.data.slice(0, 2) == '0x') {
  //     options.data = options.data.slice(2);
  // }
  tx.setData(new Uint8Array(Buffer.from(options.data, 'hex')));

  var msg = tx.serializeBinary();
  var hex = msg.reduce(function(r, a) {
    return r.concat(a.toString(16).padStart(2, '0'));
  }, '');

  var hash = sha3(hex, { encoding: 'hex' });

  // var sign1 = secp256k1.sign(new Buffer(hash.toString(), 'hex'), new Buffer(options.privkey, 'hex'));
  // var bytes1 =  new Uint8Array(65);
  // console.log("sign1 signature: "+ JSON.stringify(sign1.signature));
  // bytes1.set(sign1.signature);
  // bytes1[64] = sign1.recovery;
  // console.log("sign1: ",  bytes1.reduce(function(r,a) {
  //     return r.concat(a.toString(16).padStart(2, '0'));
  // }, ""));

  var key = ec.keyFromPrivate(options.privkey, 'hex');
  var sign = key.sign(new Buffer(hash.toString(), 'hex'));
  var sign_r = sign.r.toString(16);
  var sign_s = sign.s.toString(16);
  if (sign_r.length == 63) sign_r = '0' + sign_r;
  if (sign_s.length == 63) sign_s = '0' + sign_s;
  var signature = sign_r + sign_s;
  var sign_buffer = new Buffer(signature, 'hex');
  var bytes = new Uint8Array(65);
  bytes.set(sign_buffer);
  bytes[64] = sign.recoveryParam;

  // create UnverifiedTransaction
  var tx2 = new blockchain.UnverifiedTransaction();
  tx2.setTransaction(tx);
  tx2.setCrypto(blockchain.Crypto.SECP);
  tx2.setSignature(bytes);

  // get protobuf of UnverifiedTransaction
  var bytes = tx2.serializeBinary();

  var hexstr = bytes.reduce(function(r, a) {
    return r.concat(a.toString(16).padStart(2, '0'));
  }, '');

  hexstr = hexstr.slice(0, 2) == '0x' ? hexstr : '0x' + hexstr;

  return hexstr;
};

export default inputTransactionFormatterCita;
