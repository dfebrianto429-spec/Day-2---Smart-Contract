// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    // State variable untuk menyimpan angka (integer positif).
    // Variabel ini disimpan secara permanen di blockchain.
    uint256 private storedValue;

    // Alamat wallet pemilik contract (deployer).
    address public owner;

    // Variabel string untuk menyimpan pesan teks.
    string public message;

    // Event berfungsi sebagai log yang bisa dibaca oleh aplikasi frontend.
    // Event ini dipicu saat storedValue berubah.
    event ValueUpdated(uint256 newValue);

    // Event ini dipicu saat owner ditetapkan (saat deployment).
    event OwnerSet(address indexed owner);

    // Event ini dipicu saat message berubah.
    event MessageUpdated(string newMessage);

    // Modifier adalah fungsi khusus untuk membatasi akses.
    // Modifier ini memastikan hanya owner yang bisa memanggil fungsi tertentu.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner"); // Cek apakah pemanggil adalah owner
        _; // Lanjutkan eksekusi fungsi jika syarat terpenuhi
    }

    // Constructor dijalankan hanya sekali saat contract pertama kali dideploy.
    constructor() {
        owner = msg.sender; // Set pengirim transaksi deployment sebagai owner
        emit OwnerSet(owner);
    }

    // Fungsi untuk mengubah nilai storedValue.
    // Hanya bisa dipanggil oleh owner (karena menggunakan modifier onlyOwner).
    function setValue(uint256 _value) public onlyOwner {
        storedValue = _value; // Update state variable
        emit ValueUpdated(_value); // Emit event log
    }

    // Fungsi untuk membaca nilai storedValue.
    // 'view' berarti fungsi ini hanya membaca data tanpa mengubah state (gratis gas).
    function getValue() public view returns (uint256) {
        return storedValue;
    }

    // Fungsi untuk memperbarui pesan.
    // Hanya bisa dipanggil oleh owner.
    function updateMessage(string memory _message) public onlyOwner {
        message = _message;
        emit MessageUpdated(_message);
    }
}
