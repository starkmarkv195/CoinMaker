const Tracker = require('/src/tracker');
const MiningAnalytics = require('/src/metrics');
const Nonce = require('/src/nonce');

async function mineBitcoin() {
    try {
        // Initialize Tracker
        const tracker = new Tracker();
        
        // Start tracking
        tracker.startTracking();

        // Monitoring and Analytics Module

        // Instantiate MiningAnalytics
        const miningAnalytics = new MiningAnalytics();

        // Example usage: Update monitoring data
        miningAnalytics.updateHashRate(1500);
        miningAnalytics.updateShareStats(10, 2);

        // Example usage: Log monitoring data and trigger alerts
        miningAnalytics.logMonitoringData();
        miningAnalytics.triggerAlerts();

        // Perform mining tasks
        const block = await Nonce.mineBlock(rpcConnection, tracker);

        // End tracking
        tracker.endTracking();

        // Log successful mining status
        tracker.logStatus("Mining process completed successfully");

        return block;
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