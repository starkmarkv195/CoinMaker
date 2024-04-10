// Import necessary modules
const BitcoinRPCWrapper = require('./src/wrapper');
const Nonce = require('./src/nonce');
const Tracker = require('./src/tracker');
const MiningAnalytics = require('./src/metrics');
const TransactionValidator = require('./src/transactionvalidator');
const { logRPCRequest, logRPCResponse } = require('./src/logging');

// Configure Bitcoin RPC connection parameters
const rpcConfig = {
    protocol: 'http', // Change to 'https' if using HTTPS
    host: '127.0.0.1', // RPC server host address
    port: 8333, // RPC server port
    username: 'starkmarkv95', // RPC username
    password: 'Tythos55!!' // RPC password
};

// Initialize Bitcoin RPC wrapper
const bitcoinRPC = new BitcoinRPCWrapper(rpcConfig);

// Initialize Tracker
const tracker = new Tracker();

// Start tracking
tracker.startTracking();

// Initialize MiningAnalytics
const miningAnalytics = new MiningAnalytics();

// Example usage: Update monitoring data
miningAnalytics.updateHashRate(1500);
miningAnalytics.updateShareStats(10, 2);

// Example usage: Log monitoring data and trigger alerts
miningAnalytics.logMonitoringData();
miningAnalytics.triggerAlerts();

// Function to create a coinbase transaction
function createCoinbaseTransaction(rewardAddress, rewardAmount) {
    const coinbaseTx = {
        txid: '', // Will be filled in later when the transaction is broadcasted
        vout: 0,  // Output index
        scriptPubKey: `OP_DUP OP_HASH160 ${rewardAddress} OP_EQUALVERIFY OP_CHECKSIG`, // P2PKH script
        value: rewardAmount
    };
    return coinbaseTx;
}

// Perform mining tasks
async function mineBitcoin() {
    try {
        // Generate coinbase transaction
        const rewardAddress = 'bc1qafkd8uluq6jvp0zaqpk3rnzmqwqrmmtce9v5td';
        const rewardAmount = 6.25; // BTC
        const coinbaseTx = createCoinbaseTransaction(rewardAddress, rewardAmount);

        // Log RPC request
        logRPCRequest('mineBlock', { rewardAddress, rewardAmount });

        // Mine block with the coinbase transaction
        const block = await Nonce.mineBlock(bitcoinRPC, tracker, coinbaseTx);

        // Log RPC response
        logRPCResponse({ success: true, block });

        // Validate the mined block
        const isValidBlock = TransactionValidator.verifyTransaction(block);

        // End tracking
        tracker.endTracking();

        if (isValidBlock) {
            // Log successful mining status
            tracker.logStatus("Mining process completed successfully");

            return block;
        } else {
            throw new Error('Mined block is invalid');
        }
    } catch (error) {
        // Log error
        console.error("Error occurred during mining:", error);

        // End tracking
        tracker.endTracking();

        // Log failure status
        tracker.logStatus("Mining process failed");

        // Handle error
        throw error;
    }
}

// Export the mineBitcoin function
module.exports = {
    mineBitcoin
};