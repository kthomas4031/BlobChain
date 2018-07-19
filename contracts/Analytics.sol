pragma solidity ^0.4.24;

contract Analytics {
    //Struct keeps all the data for the client
    struct Record{
        bytes32 userName;
        string[] devices;
        uint[] stepsTaken;
        uint currentWeight;
        uint[] heartRate;
        uint[] calorieIntake;
    }
    mapping (address => Record) records;
    address private ownerAdmin;

    //Constructor(Called when I deploy the contract)
    constructor() public {
        ownerAdmin = msg.sender;
    }
    
    function createUserName(bytes32 name) public {
        records[msg.sender].userName = name;
    }

    //Send the info provided (buttons for each different stat)
    function updateSteps(uint steps) public payable {
        records[msg.sender].stepsTaken.push(steps);
    }
    function updateWeight(uint weight) public payable {
        records[msg.sender].currentWeight = weight;
    }
    function updateHeartRate(uint rate) public payable {
        records[msg.sender].heartRate.push(rate);
    }
    function updateCalories(uint calories) public payable {
        records[msg.sender].calorieIntake.push(calories);
    }
    function updateDevices(string device) public payable {
        records[msg.sender].devices.push(device);
    }

    function strConcatenation(string _a, string _b) internal pure returns (string){
        bytes memory _bytesa = bytes(_a);
        bytes memory _bytesb = bytes(_b);

        string memory allocationSize = new string(_bytesa.length + _bytesb.length);
        bytes memory combinedString = bytes(allocationSize);
        uint k = 0;

        for (uint i = 0; i < _bytesa.length; i++) combinedString[k++] = _bytesa[i];
        for (i = 0; i < _bytesb.length; i++) combinedString[k++] = _bytesb[i];

        return string(combinedString);
    }

    //When the website opens, call these to display user's data
    function getUserName() public view returns(bytes32){
        return records[msg.sender].userName;
    }
    function getSteps() public view returns(uint[]){
        return records[msg.sender].stepsTaken;
    }
    function getWeight() public view returns(uint){
        return records[msg.sender].currentWeight;
    }
    function getHeartRate() public view returns(uint[]){
        return records[msg.sender].heartRate;
    }
    function getCalories() public view returns(uint[]){
        return records[msg.sender].calorieIntake;
    }
    function getDevices() public view returns(string){
        string memory result = "";
        for (uint i = 0; i < records[msg.sender].devices.length; i++) {
            result = strConcatenation(result, records[msg.sender].devices[i]);
        }
        return result;
    }
}