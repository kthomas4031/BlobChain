pragma solidity ^0.4.23;

contract Analytics {
    mapping (address => string) public userName;
    mapping (address => uint) stepsTaken;
    mapping (address => uint ) weight;
    address ownerAdmin;

    //Constructor
    constructor() public {
        ownerAdmin = msg.sender;
        userName[ownerAdmin] = "Admin Kyle";
        stepsTaken[msg.sender] = 0;
        weight[msg.sender] = 0;
    }

    modifier onlyAdmin() {
        if(msg.sender != ownerAdmin)
        revert();
        _;
    }

    function updateStats() public {

    }

    function getSteps() public view returns(uint){
        return stepsTaken[msg.sender];
    }
    function getWeight() public view returns(uint){
        return weight[msg.sender];
    }
}