pragma solidity ^0.4.24;

contract Analytics {
    //Struct keeps all the data for the client
    struct Record{
        string userName;
        string[] devices;
        uint[] stepsTaken;
        uint[] currentWeight;
        uint[] heartRate;
        uint[] calorieIntake;
    }
    mapping (address => Record) records;
    address private ownerAdmin;

    //Constructor(Called when I deploy the contract)
    constructor() public {
        ownerAdmin = msg.sender;
        records[ownerAdmin].userName = "Admin Kyle";
        records[ownerAdmin].stepsTaken[0] = 1337000;
        records[ownerAdmin].currentWeight[0] = 168;
        records[ownerAdmin].heartRate[0] = 78;
        records[ownerAdmin].calorieIntake[0] = 2670;
    }

    //add the "only admin" modifier to any dangerous functions
    modifier onlyAdmin() {
        require(msg.sender == ownerAdmin);
        _;
    }
    //Emergency "removal" of user doing something bad (NOTE: Does not actually block the user. For now.)
    function deleteUser(address victim) public onlyAdmin{
        delete records[victim];
    }

    function createUserName(string name) public {
        records[msg.sender].userName = name;
    }

    //Send the info provided (buttons for each different stat)
    function updateSteps(uint steps) public {
        records[msg.sender].stepsTaken.length += 1;
        records[msg.sender].stepsTaken[records[msg.sender].stepsTaken.length] = steps;
    }
    function updateWeight(uint weight) public {
        records[msg.sender].currentWeight.length += 1;
        records[msg.sender].currentWeight[records[msg.sender].currentWeight.length] = weight;
    }
    function updateHeartRate(uint rate) public {
        records[msg.sender].heartRate.length += 1;
        records[msg.sender].heartRate[records[msg.sender].heartRate.length] = rate;
    }
    function updateCalories(uint calories) public {
        records[msg.sender].calorieIntake.length += 1;
        records[msg.sender].calorieIntake[records[msg.sender].calorieIntake.length] = calories;
    }
    function updateDevices(string device) public {
        records[msg.sender].devices.length += 1;
        records[msg.sender].devices[records[msg.sender].devices.length] = device;
    }

    function strConcatenation(string _a, string _b, string _c, string _d, string _e) internal pure returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);

        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;

        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];

        return string(babcde);
    }

    function strConcat(string _a, string _b) pure internal returns (string) {
        return strConcatenation(_a, _b, " ", " ", " ");
    }

    //When the website opens, call these to display user's data
    function getUserName() public view returns(string){
        return records[msg.sender].userName;
    }
    function getSteps() public view returns(uint[]){
        return records[msg.sender].stepsTaken;
    }
    function getWeight() public view returns(uint[]){
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
            result = strConcat(result, records[msg.sender].devices[i]);
        }
        return result;
    }
}