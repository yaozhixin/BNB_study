import { task } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { ProxyAdmin__factory } from "../typechain-types";
import CounterContractJson from "../artifacts/contracts/Counter.sol/Counter.json";
import Counter2ContractJson from "../artifacts/contracts/Counter_2.sol/Counter_2.json";
import { BigNumber } from "ethers";

const CounterContractAbi = CounterContractJson.abi;
const Counter2ContractAbi = Counter2ContractJson.abi;

function stringToUint256(input: string): BigNumber {
  const value = BigNumber.from(input);
  return value;
}

task("getCount").setAction(async (_, hre) => {
  const { network } = hre;
  // Admin is not able to interact with the logic contract directly
  const [ dev, alice ] = await hre.ethers.getSigners();
  const addressList = readAddressList();
  const CounterProxy = new hre.ethers.Contract(addressList[network.name].ProxyContract, Counter2ContractAbi, alice);

  const count = await CounterProxy.getCount();
  console.log("count: ", count.toString());
});

task("getVersion").setAction(async (_, hre) => {
  const { network } = hre;
  const [ dev, alice ] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const CounterProxy = new hre.ethers.Contract(addressList[network.name].ProxyContract, Counter2ContractAbi, alice);
  const version = await CounterProxy.getVersion();
  console.log("version: ", version.toString());
});

task("increment").setAction(async (_, hre) => {
    const { network } = hre;
    const [ dev, alice ] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const CounterProxy = new hre.ethers.Contract(addressList[network.name].ProxyContract, Counter2ContractAbi, alice);
    const tx = await CounterProxy.increment();
    await tx.wait()
    // console.log("tx: ", await tx.wait());

    const currentCount = await CounterProxy.getCount();
    console.log("currentCount: ", currentCount.toString());
  });

task("decrement").setAction(async (_, hre) => {
    const { network } = hre;
    const [ dev, alice ] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const CounterProxy = new hre.ethers.Contract(addressList[network.name].ProxyContract, Counter2ContractAbi, alice);
    if (CounterProxy.hasOwnProperty("decrement")) {
        const count = await CounterProxy.getCount()
        if (stringToUint256(count) > BigNumber.from(0)) {
            const tx = await CounterProxy.decrement();
            await tx.wait();
            const currentCount = await CounterProxy.getCount();
            console.log("currentCount: ", currentCount.toString());
        } else {
            console.log("count is already 0");
        }
    } else {
        console.log("decrement function not found");
    }
  });

task("updateLogicContract").setAction(async (_, hre) => {
    const { network } = hre;
    const [ dev ] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const ProxyAdminContract = new ProxyAdmin__factory(dev).attach(
        addressList[network.name].ProxyAdmin
    );

    await ProxyAdminContract.upgrade(
                        addressList[network.name].ProxyContract, 
                        addressList[network.name].LogicContractNew);
    console.log("Update Logic contract");
  });