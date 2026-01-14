import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    // Versi Solidity yang digunakan untuk compile contract
    version: "0.8.20",
    settings: {
      optimizer: {
        // Mengaktifkan optimizer untuk menghemat gas
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Konfigurasi jaringan Avalanche Fuji Testnet
    avalancheFuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc", // RPC URL publik untuk Fuji
      chainId: 43113, // Chain ID untuk Avalanche Fuji
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // Private key dari environment variable
    },
  },
  etherscan: {
    // API key untuk verifikasi contract di block explorer (Snowtrace)
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
