const {
  nervos,
  from,
  privateKey,
  tx
} = require('./config')

const inquireReceipt = txHash =>
  new Promise((resolve, reject) => {
    let remains = 10
    let interval = setInterval(() => {
      if (!remains) {
        clearInterval(interval)
        reject(new Error('No Receipt Received'))
      }
      remains--
      nervos.appchain.getTransactionReceipt(txHash).then(receipt => {
        if (receipt && receipt.transactionHash) {
          clearInterval(interval)
          resolve(receipt)
        }
      })
    }, 1000)
  })

test.skip('signTransaction', () => {
  //
})

test.skip('sendSignedTransaction', () => {
  //
})

test('sendTransaction, getTransactionReceipt, and getTransaction', async () => {
  expect.assertions(5)
  jest.setTimeout(30000)
  const currentHeight = await nervos.appchain.getBlockNumber()
  const result = await nervos.appchain.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88,
  })
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireReceipt(result.hash)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await nervos.appchain.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  return
})

test('transfer', async () => {
  expect.assertions(6);
  jest.setTimeout(30000);

  const to = '0xb4061fa8e18654a7d51fef3866d45bb1dc688710'
  const prevBalance = await nervos.appchain.getBalance(to)
  // console.log(`prev balance of ${to} is ${prevBalance}`)

  const currentHeight = await nervos.appchain.getBlockNumber()
  const result = await nervos.appchain.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88,
    data: '',
    value: '0xff',
    to,
  })
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireReceipt(result.hash)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await nervos.appchain.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  const currentBalance = await nervos.appchain.getBalance(to)
  // console.log(`current balance of ${to} is ${currentBalance}`)
  expect(+currentBalance).toBeGreaterThan(+prevBalance)
})

test.skip('sign', () => {
  //
})

test.skip('call', async () => {
  //
})

test('listen to transaction receipt', async () => {
  const currentHeight = await nervos.appchain.getBlockNumber()
  const result = await nervos.appchain.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88,
  });
  const receipt = await nervos.listeners.listenToTransactionReceipt(result.hash);
  console.log(receipt);
  expect(receipt.transactionHash).toBe(result.hash);
});
