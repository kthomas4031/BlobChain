pragma solidity ^0.4.24;

contract Analytics {
    //Struct keeps all the data for the client
    struct Record {
        string userName;
        string[] devices;
        uint[] stepsTaken;
        uint currentWeight;
        uint[] heartRate;
        uint[] calorieIntake;
    }
    mapping (address => Record) public records;
    address private ownerAdmin;

    //Constructor(Called when I deploy the contract)
    constructor() public {
        ownerAdmin = msg.sender;
    }
    
    function createUserName(string name) public {
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
    function getUserName(address requested) public view returns(string){
        return records[requested].userName;
    }
    function getSteps(address requested) public view returns(uint[]){
        return records[requested].stepsTaken;
    }
    function getWeight(address requested) public view returns(uint){
        return records[requested].currentWeight;
    }
    function getHeartRate(address requested) public view returns(uint[]){
        return records[requested].heartRate;
    }
    function getCalories(address requested) public view returns(uint[]){
        return records[requested].calorieIntake;
    }
    function getDevices(address requested) public view returns(string){
        string memory result = "";
        for (uint i = 0; i < records[requested].devices.length; i++) {
            result = strConcatenation(result, records[requested].devices[i]);
        }
        return result;
    }
}