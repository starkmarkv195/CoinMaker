// Nonce module

// Import required dependencies
const { createCoinbaseTransaction } = require('./blockfunctions'); // Import the blockfunctions module
const { getBlockTemplate, getBits, getTarget } = require('./rpc_connection'); // Import the rpc_connection module
const crypto = require('crypto');

// Nonce class
class Nonce {
    constructor(rpcConnection) {
        this.rpcConnection = rpcConnection;
    }

    async mineBlock(tracker) {
        // Other code...
        const rewardAddress = 'bc1qafkd8uluq6jvp0zaqpk3rnzmqwqrmmtce9v5td'; // Set reward address here
        const coinbaseTx = createCoinbaseTransaction(outputAddress, rewardAddress, rewardAmount);
    }

    async calculateNonceRange() {
        try {
            const blockTemplate = await getBlockTemplate(this.rpcConnection);
            const target = await getTarget(this.rpcConnection, blockTemplate.bits);
            // Calculate nonce range based on target difficulty and block timestamp
            const nonceStart = 0;
            const nonceEnd = 4294967296; // 2^32
            return [nonceStart, nonceEnd];
        } catch (error) {
            console.error("Error calculating nonce range:", error);
            throw error; // Rethrow the error to handle it in the caller function
        }
    }

    async findValidNonceInRange(nonceRange, target, blockTimestamp) {
        try {
            const [start, end] = nonceRange;
            for (let nonce = start; nonce < end; nonce++) {
                const blockHash = this.calculateBlockHash(nonce, blockTimestamp);
                if (parseInt(blockHash, 16) < target) {
                    return nonce;
                }
            }
            return null; // No valid nonce found in the range
        } catch (error) {
            console.error("Error finding valid nonce:", error);
            throw error; // Rethrow the error to handle it in the caller function
        }
    }

    calculateBlockHash(nonce, blockTimestamp) {
        const blockHeader = nonce + blockTimestamp.toString();
        return crypto.createHash('sha256').update(blockHeader).digest('hex');
    }

    // Modified function to provide the derived nonce
    async getDerivedNonce() {
        try {
            const blockTemplate = await getBlockTemplate(this.rpcConnection);
            const blockTimestamp = blockTemplate.curtime;
            const bits = await getBits(this.rpcConnection);
            const target = await getTarget(this.rpcConnection, bits);
            const nonceRange = await this.calculateNonceRange();
            const derivedNonce = await this.findValidNonceInRange(nonceRange, target, blockTimestamp);
            return derivedNonce;
        } catch (error) {
            console.error("Error getting derived nonce:", error);
            throw error; // Rethrow the error to handle it in the caller function
        }
    }
}

// Export Nonce class for external usage
module.exports = Nonce;
