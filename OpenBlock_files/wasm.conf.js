if (typeof global !== 'undefined') {
  // global already exists
} else if (typeof window !== 'undefined') {
  window.global = window;
} else if (typeof self !== 'undefined') {
  self.global = self;
}

global.tssWasmJsonURL =
  'https://obstatic.243096.com/download/wasm/tss.z.022800.json';
global.blockatlasWasmJsonURL =
  'https://obstatic.243096.com/download/wasm/blockatlas.zip_040311.json';
global.walletCoreWasmURL =
  'https://obstatic.243096.com/download/wasm/mwc.z.02181740.json';
global.domainList = 'https://obstatic.243096.com/download/domain.json';
global.gwHost = 'https://gateway.openblock.com';
global.userBaseURL = 'https://user.openblock.top';
global.sqsBaseURL = 'https://sqs.openblock.top';
global.wsBaseURL = 'https://ws.openblock.com';
global.ALL_CHAIN_DATA_URL =
  'https://obstatic.243096.com/download/token/tokenlist/tokenlist.json';
global.CHAIN_DATA_URL = 'https://obstatic.243096.com/download/token/tokenlist/';
global.sensorsUrl = 'https://sensorsdatav2.bixin.com/sa?project=openblock';
console.log = () => {};
global.siteURL = 'https://openblock.com';
global.crosschainURL = 'https://miraidon.web3app.vip/';
global.nftMarketURL = 'https://nft.openblock.com/';
