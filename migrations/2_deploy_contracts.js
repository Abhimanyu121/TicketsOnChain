var SimpleStorage = artifacts.require("./TicketsOnChain.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
