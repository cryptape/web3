import Web3 from 'web3';

const listener = (web3: Web3 & { appchain?: any }) => {
  const listeners = {
    listenToTransactionReceipt: (
      transactionHash: string,
      times: number = 10
    ) => {
      return new Promise((resolve, reject) => {
        let remains = times;
        let listener: any = null;
        const stopWatching = () => {
          clearInterval(listener);
        };
        listener = setInterval(() => {
          if (!remains) {
            stopWatching();
            reject('No Receipt Receved');
          }
          web3.appchain
            .getTransactionReceipt(transactionHash)
            .then((res: any) => {
              remains--;
              if (res) {
                clearInterval(listener);
                resolve(res);
              }
            });
        }, 1000);
      });
    }
  };
  // web3.appchain.listeners = listeners
  return { ...web3, listeners };
};

export default listener;
