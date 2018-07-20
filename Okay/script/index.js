var account;
const analyticsContractABI =[{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"createUserName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"calories","type":"uint256"}],"name":"updateCalories","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"device","type":"string"}],"name":"updateDevices","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"rate","type":"uint256"}],"name":"updateHeartRate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"steps","type":"uint256"}],"name":"updateSteps","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"weight","type":"uint256"}],"name":"updateWeight","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"requested","type":"address"}],"name":"getCalories","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"requested","type":"address"}],"name":"getDevices","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"requested","type":"address"}],"name":"getHeartRate","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"requested","type":"address"}],"name":"getSteps","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"requested","type":"address"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"requested","type":"address"}],"name":"getWeight","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"records","outputs":[{"name":"userName","type":"string"},{"name":"currentWeight","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
const contractAddress = `0xc683461e36d3f38bee4ca19a4c938cc808667eb8`;
var analyticsContractInstance;
var stepsArray;
var weightArray;
var caloriesArray;
var heartRateArray;

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
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(getData);
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

    analyticsContractInstance.getWeight(account, function(error, result){
        if(!error)
            document.getElementById('weight').innerHTML = "Current Weight: " + result;
        else
            console.error("Error: No Weight Records Found");
    });

    analyticsContractInstance.getSteps(account, function(error, result){
        if(!error){
            var stepsArray = result;
            console.log(stepsArray);
            document.getElementById('totalSteps').innerHTML = 'Total Steps: ' + eval(stepsArray.join('+'));
            createStepsGraph(stepsArray);
        }
        else
            console.error("Error: No Step Records Found");
    });

    analyticsContractInstance.getHeartRate(account, function(error, result){
        if(!error){
            var heartRateArray = result;
            console.log(heartRateArray);
            document.getElementById('averageRate').innerHTML = 'Average Heart Rate:' + (eval(heartRateArray.join('+'))/heartRateArray.length);
        }
        else
            console.error("Error: No Heart Rate Records Found");
    });

    analyticsContractInstance.getCalories(account, function(error, result){
        if(!error){
            var caloriesArray = result;
            console.log(caloriesArray);
            document.getElementById('averageCalories').innerHTML = 'Average Calories: ' + (eval(caloriesArray.join('+'))/caloriesArray.length);
        }
        else
            console.error("Error: No Calorie Records Found");
    });

    // analyticsContractInstance.getDevices(account, function(error, result){
    //     if(!error)
    //         var deviceArray = result;
    //     else
    //         console.error("Error: No Weight Found");
    // });

    analyticsContractInstance.getUserName(account, function(error, result){
        if(!error && result !== undefined && result !== ""){
            elem = document.getElementById('usernameDisplay');
            elem.innerHTML = 'Welcome ' + result;
            elem.style.textAlign = "center";
            document.getElementById('usernameField').remove();
            document.getElementById('userSubmit').remove();
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
    if(document.getElementById('stepField').value !== undefined){
        analyticsContractInstance.updateSteps(document.getElementById('stepField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
        document.getElementById('stepField').value = '';
        }
    else
        console.log("Please enter Number of Steps before clicking this Button.");
}
function sendWeight(){
    if(document.getElementById('weightField').value !== undefined){
        analyticsContractInstance.updateWeight(document.getElementById('weightField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
        document.getElementById('weightField').value = '';
    }
    else
        console.log("Please enter a Weight before clicking this Button.");
}
function sendHeartRate(){
    if(document.getElementById('heartrateField').value !== undefined){
        analyticsContractInstance.updateHeartRate(document.getElementById('heartrateField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
            document.getElementById('heartrateField').value = '';
        }
    else
        console.log("Please enter a HeartRate before clicking this Button.");
}
function sendCalories(){
    if(document.getElementById('calorieField').value !== undefined){
        analyticsContractInstance.updateCalories(document.getElementById('calorieField').value, function(error,transactionHash){
            if (error)
                console.log(transactionHash);
            });
            document.getElementById('calorieField').value = '';
        }
    else
        console.log("Please enter Calorie Intake before clicking this Button.");
}
function sendDevice(){
    // if(document.getElementById('stepField').value !== undefined)
    //     analyticsContractInstance.updateDevices(document.getElementById('stepField').value);
    // else
    //     console.log("Please Enter a Device before clicking this Button.");
}

function createStepsGraph(array){
    let entries = [];
    let combinedData = [];
    for(let i = 0; i < array.length; i++){
        entries[i] = i+1;
        // console.log(entries[i], array[i].c[0]);
        combinedData[i] = [entries[i], array[i].c[0]];
    }

    let data = new google.visualization.DataTable();
    data.addColumn('number', 'Entry Number');
    data.addColumn('number', 'Steps')

    console.log(combinedData);
    data.addRows(combinedData);

    let options = {
        chart: {
            title: 'Steps Taken Over Time'
        },
        hAxis: {
          title: 'Entry Number'
        },
        vAxis: {
          title: 'Steps Taken'
        },
        backgroundColor: '#C669FF'
    };

    let chart = new google.charts.line(document.getElementById('stepsGraph'));
    chart.draw(data, options);
}