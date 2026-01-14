import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
    // Mendapatkan wallet client dari konfigurasi Hardhat (deployer)
    const [deployer] = await hre.viem.getWalletClients();

    console.log(
        "Deploying contracts with the account:",
        deployer.account.address
    );

    // Deploy contract SimpleStorage menggunakan viem
    // hre.viem.deployContract akan mengompilasi dan mengirim transaksi deployment
    const simpleStorage = await hre.viem.deployContract("SimpleStorage");

    console.log("SimpleStorage deployed to:", simpleStorage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
