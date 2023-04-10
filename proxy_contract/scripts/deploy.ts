import { ethers, network } from "hardhat";
import { readAddressList, storeAddressList } from "./helper";

async function main() {
  // Get signer
  const [deployer] = await ethers.getSigners();

  // Deploy Logic contract
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();
  console.log("Deployed Counter on", network.name);
  console.log(`Transaction hash: ${counter.deployTransaction.hash}`);

  // Deploy ProxyAdmin contract
  const ProxyAdmin = await ethers.getContractFactory("ProxyAdmin");
  const proxyAdmin = await ProxyAdmin.deploy();
  await proxyAdmin.deployed();
  console.log("Deployed ProxyAdmin on", network.name);
  console.log(`Transaction hash: ${proxyAdmin.deployTransaction.hash}`);

  // Deploy Proxy contract
  // initial value for counter is 8
  const initData = counter.interface.encodeFunctionData("initialize", [8]);
  const ProxyContract = await ethers.getContractFactory("TransparentUpgradeableProxy");
  const proxyContract = await ProxyContract.deploy(counter.address, proxyAdmin.address, initData);
  await proxyContract.deployed();
  console.log("Deployed ProxyContract on", network.name);
  console.log(`Transaction hash: ${proxyContract.deployTransaction.hash}`);

  const addressList = readAddressList();
  if (!addressList[network.name]) {
    addressList[network.name] = {};
  }
  addressList[network.name].ProxyAdmin = proxyAdmin.address;
  addressList[network.name].LogicContract = counter.address;
  addressList[network.name].ProxyContract = proxyContract.address;
  storeAddressList(addressList)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});