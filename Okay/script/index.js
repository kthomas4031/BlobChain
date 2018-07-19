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
    account = web3.eth.accounts[0];
    document.getElementById('accountNumber').innerHTML = 'Account Number: ' + account;
    
    const analyticsContract = web3.eth.contract(analyticsContractABI);
    analyticsContractInstance = analyticsContract.at(contractAddress);
    console.log(analyticsContractInstance);
    getData();
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
    getBlockNum();
    getBalance();

    analyticsContractInstance.getWeight(function(error, result){
        if(!error)
            document.getElementById('weightTest').innerHTML = "Current Weight: " + result;
        else
            console.error("Error: No Weight Found");
    });

    // var stepsTakenArray = web3.toDecimal(analyticsContractInstance.getSteps(account));
    // var heartRateArray = web3.toDecimal(analyticsContractInstance.getHeartRate(account));
    // var caloricArray = web3.toDecimal(analyticsContractInstance.getCalories(account));
    // var devicesArray = web3.toDecimal(analyticsContractInstance.getDevices(account));

    analyticsContractInstance.getUserName(account, function(error, result){
        if(!error){
            document.getElementById('usernameDisplay').innerHTML = 'Welcome ' + result;
            document.getElementById('usernameField').parentNode.removeChild(document.getElementById('usernameField'));
            document.getElementById('usernameSubmit').parentNode.removeChild(document.getElementById('usernameSubmit'));
        }
        else
            console.error("Error: No Username Found");
    });  
}

function sendUsername(){
    if(document.getElementById('usernameField').value !== undefined)
        analyticsContractInstance.createUserName(document.getElementById('usernameField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
    else
        console.log("Please enter a Username before clicking this Button.");
}

function sendSteps(){
    if(document.getElementById('stepField').value !== undefined)
        analyticsContractInstance.updateSteps(document.getElementById('stepField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
    else
        console.log("Please enter Number of Steps before clicking this Button.");
}
function sendWeight(){
    if(document.getElementById('weightField').value !== undefined)
        analyticsContractInstance.updateWeight(document.getElementById('weightField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
    else
        console.log("Please enter a Weight before clicking this Button.");
}
function sendHeartRate(){
    if(document.getElementById('heartrateField').value !== undefined)
        analyticsContractInstance.updateHeartRate(document.getElementById('heartrateField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
    else
        console.log("Please enter a HeartRate before clicking this Button.");
}
function sendCalories(){
    if(document.getElementById('calorieField').value !== undefined)
        analyticsContractInstance.updateCalories(document.getElementById('calorieField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
    else
        console.log("Please enter Calorie Intake before clicking this Button.");
}
function sendDevice(){
    // if(document.getElementById('stepField').value !== undefined)
    //     analyticsContractInstance.updateDevices(document.getElementById('stepField').value);
    // else
    //     console.log("Please Enter a Device before clicking this Button.");
}