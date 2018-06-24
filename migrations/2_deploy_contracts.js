let Analytics = artifacts.require("./Analytics.sol");

module.exports = function(deployer) {
  deployer.deploy(Analytics);
};