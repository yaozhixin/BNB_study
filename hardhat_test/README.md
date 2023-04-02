https://github.com/LIYANG-UST/bnbcamp0322/blob/main/contracts/MyToken.sol

```shell
npx hardhat help

# init
npx hardhat node

# deploy with scripts
npx hardhat run scripts/deploy.ts --network localhost

# run ut
npx hardhat test

# ?
REPORT_GAS=true npx hardhat test

# tasks
npx hardhat deploy --network localhost
npx hardhat mint --network localhost
npx hardhat burn --network localhost
npx hardhat balance --network localhost --address ${address}
```

