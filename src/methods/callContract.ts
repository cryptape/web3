import axios from 'axios';
export default (web3: any) => (method: string, params: object) => {
  const host = web3.eth.currentProvider;
  return axios.post(host, {
    type: 'call_contract',
    method,
    params
  });
};
