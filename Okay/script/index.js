var account;
const analyticsContractABI = [ {"constant": false, "inputs": [ { "name": "victim", "type": "address"} ], "name": "deleteUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "steps", "type": "uint256" } ], "name": "updateSteps", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "weight", "type": "uint256" } ], "name": "updateWeight", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSteps", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getUserName", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getWeight", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
const contractAddress = `0xb4a75a8445735fcfb9a39181f0700578bc7e37b5`;
var analyticsContractInstance;

function setup(){
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
      } else {
        alert('Install MetaMask for proper site functionality');
        // fallback 
        web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    console.log(web3.eth.accounts);
    account = web3.eth.accounts[0];
    getBlockNum();
    getBalance();
    document.getElementById('accountNumber').innerHTML = 'Account Number: ' + account;
    
    const analyticsContract = web3.eth.contract(analyticsContractABI);
    analyticsContractInstance = analyticsContract.at(contractAddress);
    getUserName();
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
    console.log("Account is valid: " + web3.isAddress(account));
    let weiBalance = web3.eth.getBalance(account, function(error, result){
        if(!error){
        let balance = web3.fromWei(result, 'ether');
        document.getElementById('accountBalance').innerHTML = 'Account Funds: '+ balance + 'Ether';
        }
        else
            console.error(error);
    });
}

//Retrieves all the data and makes it global so it can be used outside this function
function getData(){
    var stepsTakenArray = analyticsContractInstance.getSteps(account);
    var weightArray = analyticsContractInstance.getWeight(account);
    var heartRateArray = analyticsContractInstance.getHeartRate(account);
    var caloricArray = analyticsContractInstance.getCalories(account);
    var devicesArray = analyticsContractInstance.getDevices(account);
}

function getUserName(){
    analyticsContractInstance.getUserName(account, function(error, result){
        if(!error)
            document.getElementById('username').innerHTML = 'Welcome ' + result;
        else
            console.error(error);
    });    
}

function sendUsername(){
    if(document.getElementById('usernameField').value !== undefined)
        analyticsContractInstance.updateUserName(document.getElementById('usernameField').value);
    else
        console.log("Please Enter a Username before clicking this Button.");
}

// function sendSteps(){

// }
// function sendWeight(){

// }
// function sendHeartRate(){

// }
// function sendCalories(){

// }
// function sendDevice(){

// }