import { ethers, network } from "hardhat";
import { readAddressList, storeAddressList } from "./helper";

async function main() {
  // Get signer
  const [deployer] = await ethers.getSigners();

  // Deploy Logic contract
  const Counter_2 = await ethers.getContractFactory("Counter_2");
  const counter = await Counter_2.deploy();
  await counter.deployed();
  console.log("Deployed Counter_2 on", network.name);
  console.log(`Transaction hash: ${counter.deployTransaction.hash}`);

  const addressList = readAddressList();
  if (!addressList[network.name]) {
    addressList[network.name] = {};
  }
  addressList[network.name].LogicContractNew = counter.address;
  storeAddressList(addressList)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});