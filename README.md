Testing 0x protocol

Install:   
`npm install`   
`vim .env`

.env file needs to have:
```
ETHEREUM_ACCOUNT_MNEMONIC=
KOVAN_INFURA_ENDPOINT=https://kovan.infura.io/v3/YOUR_ID
INFURA_ENDPOINT=https://mainnet.infura.io/v3/YOUR_ID
ETHERSCAN_API_KEY=
PRIV_KEY=
```

`truffle migrate --network mainnet`     
`truffle run verify Test --network mainnet`    

`node script/test.js`
