const Test = artifacts.require("./Test.sol");

module.exports = function(deployer, network, accounts) {

    deployer.then(async () => {

        await deployer.deploy(Test)
    });
};
