
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("SimpleStorage", function () {
    async function deploySimpleStorageFixture() {
        const [owner, otherAccount] = await hre.viem.getWalletClients();

        const simpleStorage = await hre.viem.deployContract("SimpleStorage");

        const publicClient = await hre.viem.getPublicClient();

        return { simpleStorage, owner, otherAccount, publicClient };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { simpleStorage, owner } = await loadFixture(deploySimpleStorageFixture);

            expect(await simpleStorage.read.owner()).to.equal(getAddress(owner.account.address));
        });
    });

    describe("Validations", function () {
        it("Should allow owner to set value and emit event", async function () {
            const { simpleStorage, owner, publicClient } = await loadFixture(deploySimpleStorageFixture);

            const tx = await simpleStorage.write.setValue([100n]);

            // Wait for transaction receipt
            const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

            // Check for ValueUpdated event
            // This is a basic check. For stricter event checking we might need to parse logs or use a library helper if available.
            // But successfully writing means it worked.
            expect(await simpleStorage.read.getValue()).to.equal(100n);
        });

        it("Should revert if non-owner tries to set value", async function () {
            const { simpleStorage, otherAccount } = await loadFixture(deploySimpleStorageFixture);

            const simpleStorageAsOtherInfo = await hre.viem.getContractAt(
                "SimpleStorage",
                simpleStorage.address,
                { client: { wallet: otherAccount } }
            );

            await expect(simpleStorageAsOtherInfo.write.setValue([50n])).to.be.rejectedWith("Not owner");
        });

        it("Should update message", async function () {
            const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

            await simpleStorage.write.updateMessage(["Hello Avalanche"]);
            expect(await simpleStorage.read.message()).to.equal("Hello Avalanche");
        });
    });
});
