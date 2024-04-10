// Import required dependencies
const crypto = require('crypto');

/**
 * Parses the block template response.
 * @param {Object} response - The response object containing block template data.
 * @returns {Object} - The parsed block template data.
 */
function parseBlockTemplateResponse(response) {
    const { coinbasevalue, transactions, target, mintime, bits } = response.result;
    return { coinbaseValue: coinbasevalue, transactions, target, mintime, bits };
}

/**
 * Constructs a block.
 * @param {Object} template - The block template containing necessary data.
 * @returns {Object} - The constructed block.
 */
function constructBlock(template) {
    const { transactions, coinbaseValue, target, mintime, bits } = template;
    return { transactions: transactions.map(tx => tx.txid), coinbaseValue, target, mintime, bits };
}

/**
 * Calculates the hash of a block.
 * @param {Object} blockHeader - The block header.
 * @param {number} nonce - The nonce value.
 * @returns {string} - The calculated block hash.
 */
function calculateBlockHash(blockHeader, nonce) {
    const headerString = JSON.stringify(blockHeader);
    const hashInput = headerString + nonce;
    const blockHash = crypto.createHash('sha256').update(hashInput).digest('hex');
    return blockHash;
}

/**
 * Finds a valid nonce for a block.
 * @param {Object} blockHeader - The block header.
 * @param {number} target - The target difficulty.
 * @returns {number} - The valid nonce value.
 */
function findValidNonce(blockHeader, target) {
    let nonce = 0;
    while (true) {
        const blockHash = calculateBlockHash(blockHeader, nonce);
        const hashInt = parseInt(blockHash, 16);
        if (hashInt < target) {
            return nonce;
        }
        nonce++;
    }
}

// Export functions for external usage
module.exports = {
    parseBlockTemplateResponse,
    constructBlock,
    calculateBlockHash,
    findValidNonce
};
