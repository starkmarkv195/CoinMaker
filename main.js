// Import necessary modules
const BitcoinRPCWrapper = require('./src/wrapper');
const Nonce = require('./src/nonce');
const Tracker = require('./src/tracker');
const MiningAnalytics = require('./src/metrics');

// Function to perform mining tasks
async function performMining() {
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

    try {
        // Perform mining tasks
        const block = await Nonce.mineBlock(bitcoinRPC, tracker);

        // End tracking
        tracker.endTracking();

        // Log successful mining status
        tracker.logStatus("Mining process completed successfully");

        console.log("Mined block:", block);
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

// Export the performMining function
module.exports = {
    performMining
};
