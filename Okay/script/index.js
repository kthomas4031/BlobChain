var account;

function setup(){
    web3 = new Web3(window.web3.currentProvider); 
    console.log(web3.eth.accounts[0]);
    const analyticsContractABI = [ {"constant": false, "inputs": [ { "name": "victim", "type": "address"} ], "name": "deleteUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "steps", "type": "uint256" } ], "name": "updateSteps", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "weight", "type": "uint256" } ], "name": "updateWeight", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSteps", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getUserName", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getWeight", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
    getBlockNum();
    getBalance();
    document.getElementById('accountNumber').innerHTML = 'Account Number: ' + web3.eth.accounts[0];
    const contractAddress = `0xb4a75a8445735fcfb9a39181f0700578bc7e37b5`;
    const analyticsContract = web3.eth.contract(analyticsContractABI, contractAddress);
    let analyticsContractInstance = analyticsContract.at(contractAddress);
}

function getBlockNum(){
    web3.eth.getBlockNumber(function(error, result){
        if(!error)
            document.getElementById('blockNum').innerHTML = 'Latest Block: ' + result;
        else
            console.error(error);
    });
}

function getBalance(){
    console.log("Account is valid: " + web3.isAddress(web3.eth.accounts[0]));
    let weiBalance = web3.eth.getBalance(web3.eth.accounts[0], function(error, result){
        if(!error){
        let balance = web3.fromWei(result, 'ether');
        document.getElementById('accountBalance').innerHTML = 'Account Funds: '+ balance + 'Ether';
        }
        else
            console.error(error);
    });
}
