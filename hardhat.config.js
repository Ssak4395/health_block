require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
  "optimism-goerli":{
    url:"https://goerli.optimism.io/",
    accounts:[process.env.PRIVKEY]
  }
  }
}
;
