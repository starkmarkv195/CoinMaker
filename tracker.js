class Tracker {
    constructor() {
        this.startTime = null;
        this.progressCallback = null;
        this.statusCallback = null;
    }

    startTracking() {
        this.startTime = new Date();
        console.log('Mining process started at:', this.startTime);
    }

    endTracking() {
        const endTime = new Date();
        console.log('Mining process ended at:', endTime);
        const elapsedTime = endTime - this.startTime;
        console.log('Total mining time:', elapsedTime / 1000, 'seconds');
    }

    setProgressCallback(callback) {
        this.progressCallback = callback;
    }

    setStatusCallback(callback) {
        this.statusCallback = callback;
    }

    trackProgress(current, total) {
        const progressPercentage = (current / total) * 100;
        console.log('Mining progress:', progressPercentage.toFixed(2) + '%');
        if (this.progressCallback) {
            this.progressCallback(progressPercentage);
        }
    }

    logStatus(statusMessage) {
        console.log(statusMessage);
        if (this.statusCallback) {
            this.statusCallback(statusMessage);
        }
    }
}

module.exports = Tracker;
