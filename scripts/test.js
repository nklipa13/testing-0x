const Web3 = require('web3');
const Dec = require('decimal.js');
const axios = require('axios');
const TestContractData = require('../build/contracts/Test.json');

require('dotenv').config();

const NETWORK_ID = '1';

let testContract, account, web3;

const initContracts = async () => {
    web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_ENDPOINT));

    account = web3.eth.accounts.privateKeyToAccount('0x'+process.env.PRIV_KEY);
    web3.eth.accounts.wallet.add(account);

    testContract = new web3.eth.Contract(TestContractData.abi, TestContractData.networks[NETWORK_ID].address);
};

const getPrice = async () => {
	let res = await axios(`https://api.0x.org/swap/v0/quote?buyToken=DAI&sellToken=ETH&buyAmount=1000000000000000000`);

	console.log(res.data);
	return { value: res.data.value, addr: res.data.to, data: res.data.data, gasPrice: res.data.gasPrice }
}

const takeOrder = async (addr, amount, data, gasPrice) => {
    try {
        const tx = await testContract.methods.takeOrder(addr, data).send({
            from: account.address, gas: gasPrice, value: amount, gasPrice: 6000000000
        });

        console.log(tx);
    } catch(err) {
        console.log(err);
    }
}

(async () => {
    await initContracts();

    let res = await getPrice();
   
    await takeOrder(res.addr, res.value, res.data, res.gasPrice);
})();