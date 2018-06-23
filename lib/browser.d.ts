import NervosWeb3 from './index';
declare global {
  interface Window {
    NervosWeb3: typeof NervosWeb3;
  }
}
