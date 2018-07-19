export default (wallet: any) => (transaction: any) => {
  if (
    transaction.privateKey &&
    typeof +transaction.privateKey === 'number' &&
    wallet.length &&
    +transaction.privateKey >= 0 + transaction.privateKey < wallet.length
  ) {
    // if transaction.privateKey is index, read wallet
    transaction.privateKey = wallet[+transaction.privateKey].privateKey;
    transaction.from = wallet[+transaction.privateKey].address;
  }

  if (!transaction.privateKey && wallet.length) {
    transaction.privateKey = wallet[0].privateKey;
    transaction.from = wallet[0].from;
  }
  return transaction;
};
