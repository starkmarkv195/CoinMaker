// Import required modules
const winston = require('winston');
const { exec } = require('child_process');

// Configure the logger
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'block.log' }) // Log to file
    ]
});

// Function to log RPC requests
function logRPCRequest(method, params) {
    logger.debug(`RPC request: Method: ${method}, Params: ${JSON.stringify(params)}`);
}

// Function to log RPC responses
function logRPCResponse(response) {
    logger.debug(`RPC response: ${JSON.stringify(response)}`);
}

// Function to execute a command and log the output
function execAndLog(command) {
    logger.debug(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            logger.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            logger.error(`Command stderr: ${stderr}`);
            return;
        }
        logger.debug(`Command stdout: ${stdout}`);
    });
}

// Export the functions to make them accessible from other modules
module.exports = {
    logRPCRequest,
    logRPCResponse,
    execAndLog
};
