# 📘 Day 2 – Smart Contract Fundamentals & Solidity (Avalanche)

![Avalanche](https://img.shields.io/badge/Avalanche-F62928?style=for-the-badge&logo=avalanche&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=for-the-badge&logo=hardhat&logoColor=black)

---

## 📋 Daftar Isi
- [Pre-Test](#pre-test)
- [Tujuan Pembelajaran](#-tujuan-pembelajaran)
- [Studi Kasus](#-studi-kasus)
- [Struktur Sesi](#-struktur-sesi)
- [1. Theory](#1️⃣-theory-50-menit)
  - [Apa itu Smart Contract?](#11-apa-itu-smart-contract)
  - [Mental Model](#12-mental-model-smart-contract-wajib-dipahami)
  - [Solidity Basics](#14-solidity-basics)
- [2. Demo](#2️⃣-demo-1-jam)
  - [Setup Project](#21-setup-project)
  - [Smart Contract](#22-smart-contract)
  - [Deployment](#25-deploy-contract)
- [3. Praktik (Homework)](#3️⃣-praktik--homework-1-jam)
  - [Checklist](#-checklist)
- [Referensi](#-referensi)

---

## Pre-Test (10 menit)

📝 **[Kerjakan Pre-Test Disini](https://forms.gle/5Tou5pDtRyUbdfz76)**

---

> **Avalanche Indonesia Short Course – Day 2**
>
> Hari kedua difokuskan pada **Smart Contract Layer**: bagaimana logic dan state dApp hidup di blockchain, bukan di backend server.

---

## 🎯 Tujuan Pembelajaran

Pada akhir sesi Day 2, peserta mampu:

- ✅ Memahami peran smart contract dalam arsitektur dApp
- ✅ Memahami **mental model smart contract** (Web2 → Web3)
- ✅ Menulis smart contract sederhana dengan Solidity
- ✅ Menggunakan **Hardhat** sebagai development environment
- ✅ Compile & deploy smart contract ke **Avalanche Fuji Testnet**
- ✅ Memverifikasi contract melalui block explorer
- ✅ Memahami hubungan **Frontend ↔ Wallet ↔ Smart Contract**

---

## 🧩 Studi Kasus

### Avalanche Simple Full Stack dApp – Smart Contract Layer

Smart contract pada Day 2 berfungsi sebagai:
- 📦 **Penyimpan data** di blockchain
- 🔒 **Single source of truth**
- ⚙️ **Logic inti aplikasi**

> 📌 **Note:** Contract ini akan digunakan kembali pada:
> - **Day 3** – Frontend Integration
> - **Day 5** – Full Integration

---

## ⏱️ Struktur Sesi (± 3 Jam)

| Sesi | Durasi | Aktivitas |
| :--- | :--- | :--- |
| **Pre-test** | 10 menit | Pengerjaan kuis awal |
| **Theory** | 50 menit | Konsep smart contract & Solidity |
| **Demo** | 1 Jam | Setup Hardhat & deploy contract |
| **Homework** | 40 menit | Modifikasi & deploy mandiri |
| **Post-test** | 20 menit | Pengerjaan kuis akhir |

---

# 1️⃣ Theory (50 menit)

## 1.1 Apa itu Smart Contract?

Smart contract adalah **program yang berjalan di blockchain** dan memiliki karakteristik:
1. **Menyimpan state**
2. **Mengeksekusi logic**
3. **Immutable** (tidak bisa diubah setelah deploy)

> ⚠️ **PENTING:** Smart contract **bukan backend server**.

---

## 1.2 Mental Model Smart Contract (Wajib Dipahami)

```mermaid
graph TD
    User[User (wallet + gas)] -->|sign| Frontend[Frontend (UI only)]
    Frontend -->|request| Wallet[Wallet (Core)]
    Wallet -->|transaction| Contract[Smart Contract (logic & state)]
    Contract --> Chain[Blockchain (Avalanche C-Chain)]
```

### 🔑 Catatan penting:
- Frontend **tidak menyimpan state penting**.
- Frontend **tidak menjalankan logic bisnis**.
- **Wallet** bertugas:
  - ✍️ Menandatangani transaksi
  - 📡 Mengirim transaksi ke blockchain

### 1.2.a Smart Contract ≠ Backend API

Smart contract **bukan REST API**.

| Backend Web2 | Smart Contract Web3 |
| :--- | :--- |
| Bisa dipanggil bebas | Write perlu **wallet signature** |
| Response instan | Tergantung **block confirmation** |
| Retry otomatis | Tx gagal → **gas tetap terpakai** |
| Server bayar cost | **User bayar gas** |

> 📌 UX Web3 **berbeda secara fundamental** dengan Web2.

---

## 1.3 Smart Contract vs Backend Tradisional

| Fitur | Backend Tradisional | Smart Contract |
| :--- | :--- | :--- |
| **Sifat Data** | Mutable | Immutable |
| **Arsitektur** | Terpusat | Terdesentralisasi |
| **Kepercayaan** | Trust ke operator | Trust ke code |
| **Rollback** | Bisa rollback | Tidak bisa rollback |

---

## 1.4 Solidity Basics

Konsep dasar Solidity:
- `contract` → blueprint program
- `state variable` → data di blockchain
- `function` → logic
- `view / pure` → read-only
- `event` → log transaksi

### Contoh Code

```solidity
contract Storage {
    uint256 value; // State variable
}
```

> 📌 `value` disimpan di **blockchain**, bukan di browser.

### 1.4.a `msg.sender` & Ownership

```solidity
address public owner;

constructor() {
    owner = msg.sender;
}
```

**Penjelasan:**
- `msg.sender` = wallet yang menandatangani transaksi.
- Saat deploy, deployer otomatis menjadi `owner`.
- Wallet = **identity** (tanpa login/password).

---

## 1.5 Read vs Write

| Tipe | Read (Call) | Write (Transaction) |
| :--- | :--- | :--- |
| **Biaya** | Tidak pakai gas | Pakai gas |
| **State** | Tidak ubah state | Mengubah state |
| **Signature** | Tidak perlu signature | Perlu wallet |

### 1.5.a Gas & Failure Model

| Status | State | Gas |
| :--- | :--- | :--- |
| **Success** | Berubah | Terpakai |
| **Revert** | Tidak berubah | ❌ Tetap terpakai |

**Contoh Validasi:**
```solidity
require(_value > 0, "Value must be > 0");
```
> 📌 Validasi sangat penting untuk User Experience (UX).

---

## 1.6 Hardhat Overview

**Hardhat** adalah development environment untuk Ethereum software.
- ✅ Compiler
- ✅ Deployment Tool
- ✅ Testing Framework

**Kenapa Hardhat?**
- Populer di industri.
- Sangat cocok untuk Avalanche (EVM).

**Alternatif:** Remix, Foundry.

---

# 2️⃣ Demo (1 Jam)

## 2.1 Setup Project

Lakukan inisialisasi project dan instalasi dependencies.

1. **Init Project**
   ```bash
   npm init -y
   ```

2. **Install Hardhat**
   ```bash
   yarn add -D hardhat
   # atau jika yarn belum ada:
   # corepack enable
   # corepack prepare yarn@stable --activate
   ```

3. **Konfigurasi Yarn (Optional but Recommended)**
   Buat `.yarnrc.yml`:
   ```yaml
   nmHoistingLimits: workspaces
   nodeLinker: node-modules
   ```
   Buat `.gitignore`:
   ```gitignore
   node_modules
   .env
   .yarn/*
   !.yarn/releases
   .DS_Store
   ```

4. **Install Dependencies & Init Hardhat**
   ```bash
   yarn install
   yarn dlx hardhat --init
   # Pilih: Create a TypeScript project
   ```

5. **Setup Environment Variables**
   Buat file `.env`:
   ```env
   MNEMONIC="your twelve words mnemonic phrase here"
   PRIVATE_KEY="your_private_key_here"
   ETHERSCAN_API_KEY="your_etherscan_api_key"
   ```

6. **Update `hardhat.config.ts`**
   ```ts
   import { HardhatUserConfig } from "hardhat/config";
   import "@nomicfoundation/hardhat-toolbox-viem";
   require("dotenv").config();

   const config: HardhatUserConfig = {
     solidity: {
       version: "0.8.27",
       settings: {
         optimizer: { enabled: true, runs: 1000 },
       },
     },
     networks: {
       avalancheFuji: {
         url: "https://api.avax-test.network/ext/bc/C/rpc",
         chainId: 43113,
         accounts: [process.env.PRIVATE_KEY!],
       },
     },
     etherscan: {
       apiKey: process.env.ETHERSCAN_API_KEY,
     },
   };

   export default config;
   ```

---

## 2.2 Smart Contract

Buat file **`contracts/SimpleStorage.sol`**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    event ValueUpdated(uint256 newValue);

    function setValue(uint256 _value) public {
        storedValue = _value;
        emit ValueUpdated(_value);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
```

**Fitur:**
- Menyimpan 1 nilai integer.
- Bisa di-update oleh siapa saja.
- Mengirim event saat update.

---

## 2.3 Compile & Deploy

### 1. Compile
```bash
npx hardhat compile
```
Output: Artifacts (ABI & Bytecode).

### 2. Deploy Script (`scripts/deploy.ts`)
Pastikan script deploy mengarah ke network yang benar.

```bash
npx hardhat run scripts/deploy.ts --network avalancheFuji
```

> 📝 **Catat:**
> - Contract Address
> - Transaction Hash

---

## 2.6 Verifikasi di Explorer

1. Buka [Snowtrace (Testnet)](https://testnet.snowtrace.io/).
2. Cari Contract Address anda.
3. Cek tab **Transactions** dan **Events**.

> 🎉 Sekarang smart contract sudah **hidup di blockchain**!

---

# 3️⃣ Praktik / Homework (1 Jam)

### 🎯 Objective
Peserta mampu **memodifikasi dan deploy smart contract secara mandiri**.

### 3.1 Task 1 – Ownership
Modifikasi contract agar memiliki:
- Variable `owner`.
- Event `OwnerSet`.

### 3.2 Task 2 – Event Validation
Pastikan:
- `OwnerSet` ter-emit saat deploy.
- `ValueUpdated` ter-emit saat set value.

### 3.3 Task 3 – Deploy Ulang
- Compile & Deploy ulang ke Fuji.
- Simpan **Contract Address** dan **ABI**.

### 🌟 Task 4 – (Optional) Access Control
Tambahkan modifier:
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```
Gunakan pada fungsi `setValue`.

---

## 🧪 Checklist Submission

- [ ] Contract berhasil compile
- [ ] Contract berhasil deploy ke Avalanche Fuji
- [ ] Address tersimpan
- [ ] ABI tersedia
- [ ] Event terlihat di explorer

📤 **[Link Submission](https://forms.gle/bDjmXjqaK3X7yapc8)** (Aktif 48 Jam)

---

## ✅ Output Day 2

1. Smart contract aktif di Fuji Testnet.
2. Pemahaman fundamental:
   - Smart Contract logic.
   - Wallet & Gas.
3. Siap untuk integrasi Frontend (Day 3).

## 🚀 Preview Day 3
Fokus pada **Frontend Integration**:
- Next.js Setup.
- Read data (`call`).
- Write data (`transaction`).
- Error Handling.

---

## 📚 Referensi

- [Solidity Documentation](https://docs.soliditylang.org)
- [Hardhat Documentation](https://hardhat.org)
- [Avalanche Academy](https://build.avax.network/academy)

---

## Post-Test & Feedback

- 📝 [Post-Test](https://forms.gle/JiDSq7gsFKm43AXr6)
- 🗣️ [Feedback Form](https://forms.gle/FskqGK5AZjwMMhTx9)

---

<div align="center">
  <h3>🔥 Smart contract deployed!</h3>
  <p>Besok kita mulai menghubungkan <b>frontend ↔ wallet ↔ blockchain</b> 🚀</p>
</div>