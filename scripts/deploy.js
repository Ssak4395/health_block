const hre = require("hardhat");

async function main() {
  const User = await hre.ethers.getContractFactory("User");
  const user = await User.deploy();

  await user.deployed();

  console.log("User deployed to:", user.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });