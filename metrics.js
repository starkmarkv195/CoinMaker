// Metrics module

class Metrics {
    constructor() {
        this.blocksMined = 0;
        this.successfulMiningAttempts = 0;
        this.failedMiningAttempts = 0;
        this.averageBlockTime = 0; // in seconds
        this.totalMiningTime = 0; // in seconds
        this.hashrate = 0; // in hashes per second
        this.miningEfficiency = 0; // percentage
        this.networkDifficulty = 0;
    }

    updateBlocksMined() {
        this.blocksMined++;
    }

    updateSuccessfulMiningAttempts() {
        this.successfulMiningAttempts++;
    }

    updateFailedMiningAttempts() {
        this.failedMiningAttempts++;
    }

    updateAverageBlockTime(blockTime) {
        // Calculate new average block time based on previous average and the new block time
        this.averageBlockTime = ((this.averageBlockTime * this.blocksMined) + blockTime) / (this.blocksMined + 1);
    }

    updateTotalMiningTime(miningTime) {
        this.totalMiningTime += miningTime;
    }

    updateHashrate(hashrate) {
        this.hashrate = hashrate;
    }

    updateMiningEfficiency(efficiency) {
        this.miningEfficiency = efficiency;
    }

    updateNetworkDifficulty(difficulty) {
        this.networkDifficulty = difficulty;
    }

    getMetrics() {
        return {
            blocksMined: this.blocksMined,
            successfulMiningAttempts: this.successfulMiningAttempts,
            failedMiningAttempts: this.failedMiningAttempts,
            averageBlockTime: this.averageBlockTime,
            totalMiningTime: this.totalMiningTime,
            hashrate: this.hashrate,
            miningEfficiency: this.miningEfficiency,
            networkDifficulty: this.networkDifficulty
        };
    }
}

module.exports = Metrics;
