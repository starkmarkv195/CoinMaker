// Import required dependencies
const os = require('os');

// Specs class
class Specs {
    constructor() {
        // Initialize hardware specifications
        this.cpuCores = os.cpus().length; // Number of CPU cores
        this.cpuSpeed = os.cpus()[0].speed; // CPU speed in MHz
        this.gpuModel = ''; // GPU model (if applicable)
        this.gpuMemory = 0; // GPU memory in MB (if applicable)
        // Add more hardware specifications as needed
    }

    // Method to set GPU specifications
    setGPU(model, memory) {
        this.gpuModel = model;
        this.gpuMemory = memory;
    }

    // Method to calculate hash rate based on CPU specifications
    calculateCPUMiningHashRate() {
        // Calculate hash rate based on CPU specifications
        // Formula: hash rate = (CPU cores * CPU speed) / 1000 (convert MHz to GHz)
        const hashRate = (this.cpuCores * this.cpuSpeed) / 1000;
        return hashRate;
    }

    // Method to calculate hash rate based on GPU specifications
    calculateGPUMiningHashRate() {
        // Calculate hash rate based on GPU specifications (if applicable)
        // Placeholder logic - replace with actual calculation based on GPU model and memory
        const hashRate = 0; // Placeholder value
        return hashRate;
    }

    // Method to get overall mining hash rate (combined CPU and GPU)
    getOverallMiningHashRate() {
        const cpuHashRate = this.calculateCPUMiningHashRate();
        const gpuHashRate = this.calculateGPUMiningHashRate();
        // Total hash rate is the sum of CPU and GPU hash rates
        const totalHashRate = cpuHashRate + gpuHashRate;
        return totalHashRate;
    }
}

// Export Specs class for external usage
module.exports = Specs;
