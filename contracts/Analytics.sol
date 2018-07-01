pragma solidity ^0.4.24;

contract Analytics {
    mapping (address => string) userName;
    mapping (address => uint) stepsTaken;
    mapping (address => uint ) currentWeight;
    address private ownerAdmin;

    //Constructor(Called when I deploy the contract)
    constructor() public {
        ownerAdmin = msg.sender;
        userName[ownerAdmin] = "Admin Kyle";
        stepsTaken[ownerAdmin] = 1337000;
        currentWeight[ownerAdmin] = 168;
    }

    //add the "only admin" modifier to any dangerous functions
    modifier onlyAdmin() {
        require(msg.sender == ownerAdmin);
        _;
    }
    //Emergency "removal" of user doing something bad (NOTE: Does not actually block the user. For now.)
    function deleteUser(address victim) public onlyAdmin{
        userName[victim] = "0x0";
        stepsTaken[victim] = 0;
        currentWeight[victim] = 0;
    }

    //Send the info provided (buttons for each different stat)
    function updateSteps(uint steps) public {
        stepsTaken[msg.sender] += steps;
    }
    function updateWeight(uint weight) public {
        currentWeight[msg.sender] = weight;
    }

    //When the website opens, call this to display the current person's username
    function getUserName() public view returns(string){
        return userName[msg.sender];
    }
    //Will return the total number of steps taken by the user over the course that they have used our site
    function getSteps() public view returns(uint){
        return stepsTaken[msg.sender];
    }
    //Will return the most recently recorded weight of the user listed in the chain
    function getWeight() public view returns(uint){
        return currentWeight[msg.sender];
    }
}