var Web3 = require(`web3`);
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(`http://localhost:8545`));

//var sampleContractABI = GET ABI OFF remix.ethereum.org

var sampleContract = web3.eth.contract(sampleContractABI);
var sampleContractInstance = sampleContract.at(<contract address>);

//https://medium.com/zeonlab-blockchain-semantic-blog/interaction-with-solidity-using-web3-5a4f1a7166f3