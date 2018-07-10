class Account {
    constructor(newNode, newNodeInfo, address, balance) {
      this._nodes = [];
      this._nodes_info = [];
      this._address = address || "";
      this._balance = balance || 0;
  
    }
    // Getters
    get nodes() {
      return this._nodes;
    }
    get nodes_info() {
      return this._nodes_info;
    }
    get address() {
      return this._address;
    }
    get balance() {
      return this._balance;
    }
    // Setters
    set nodes(newNode) {
      this._nodes.push(newNode);
    }
    set nodes_info(newNodeInfo) {
      this._nodes_info.push(newNodeInfo);
    }
    set address(address) {
      this._address = address;
    }
    set balance(balance) {
      this._balance = balance;
    }
    // Functions
    extendNodes(array){
      for (let i = 0; i < array.length; i++) {
        this._nodes.push(array[i]);
      }
    }
    extendNodesInfo(array){
      for (let i = 0; i < array.length; i++) {
        this._nodes_info.push(array[i]);
      }
    }
    nodesEqualTo(array){
      this._nodes = array;
    }
  }