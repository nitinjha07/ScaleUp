// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  // Setup accounts
  const [owner] = await ethers.getSigners();

  // Deploy CustomerReports
  const UsersContract = await ethers.getContractFactory("Users");
  const usersContract = await UsersContract.deploy();
  await usersContract.waitForDeployment();

  console.log(`Deployed usersContract Contract at: ${usersContract.target}`);

  // Deploy HealthLinkAI
  const EscrowContract = await ethers.getContractFactory("Escrow");
  const escrowContract = await EscrowContract.deploy(usersContract.target);

  await escrowContract.waitForDeployment();

  console.log(`Deployed escrowContract Contract at: ${escrowContract.target}`);

  console.log(`Finished.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
