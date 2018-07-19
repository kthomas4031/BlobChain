var account;
const analyticsContractABI =[{"constant":true,"inputs":[],"name":"getUserName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getHeartRate","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"calories","type":"uint256"}],"name":"updateCalories","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"steps","type":"uint256"}],"name":"updateSteps","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"}],"name":"createUserName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"rate","type":"uint256"}],"name":"updateHeartRate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getSteps","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"device","type":"string"}],"name":"updateDevices","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getWeight","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCalories","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDevices","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"weight","type":"uint256"}],"name":"updateWeight","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const contractAddress = `0xb4a75a8445735fcfb9a39181f0700578bc7e37b5`;
var analyticsContractInstance;

function setup(){
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
      } else {
        alert('Install MetaMask for proper site functionality');
        // fallback 
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    console.log(web3.eth.accounts);
    web3.eth.defaultAccount = web3.eth.accounts[0];
    account = web3.eth.accounts[0];
    getBlockNum();
    getBalance();
    document.getElementById('accountNumber').innerHTML = 'Account Number: ' + account;
    
    const analyticsContract = web3.eth.contract(analyticsContractABI);
    analyticsContractInstance = analyticsContract.at(contractAddress);
    console.log(analyticsContractInstance);
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
    var stepsTakenArray = web3.toDecimal(analyticsContractInstance.getSteps(account));
    var weight = web3.toDecimal(analyticsContractInstance.getWeight(account));
    var heartRateArray = web3.toDecimal(analyticsContractInstance.getHeartRate(account));
    var caloricArray = web3.toDecimal(analyticsContractInstance.getCalories(account));
    var devicesArray = web3.toDecimal(analyticsContractInstance.getDevices(account));
}

function getUserName(){
    analyticsContractInstance.getUserName(account, function(error, result){
        if(!error)
            document.getElementById('username').innerHTML = 'Welcome ' + web3Provider.toAscii(result);
        else
            console.error("Error: No Username Found");
    });    
}

function sendUsername(){
    if(document.getElementById('usernameField').value !== undefined)
        analyticsContractInstance.updateUserName(web3.fromascii(document.getElementById('usernameField').value, 32));
    else
        console.log("Please Enter a Username before clicking this Button.");
}

function sendSteps(){
    if(document.getElementById('stepField').value !== undefined)
        analyticsContractInstance.updateUserName(document.getElementById('stepField').value);
    else
        console.log("Please Enter a Step Number before clicking this Button.");
}
function sendWeight(){
    if(document.getElementById('weightField').value !== undefined)
        analyticsContractInstance.updateUserName(document.getElementById('weightField').value);
    else
        console.log("Please Enter a Username before clicking this Button.");
}
function sendHeartRate(){
    if(document.getElementById('heartrateField').value !== undefined)
        analyticsContractInstance.updateUserName(document.getElementById('heartrateField').value);
    else
        console.log("Please Enter a Username before clicking this Button.");
}
function sendCalories(){
    if(document.getElementById('calorieField').value !== undefined)
        analyticsContractInstance.updateUserName(document.getElementById('calorieField').value);
    else
        console.log("Please Enter a Username before clicking this Button.");
}
function sendDevice(){
    if(document.getElementById('stepField').value !== undefined)
        analyticsContractInstance.updateUserName(document.getElementById('stepField').value);
    else
        console.log("Please Enter a Username before clicking this Button.");
}