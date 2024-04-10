/**
 * Creates a coinbase transaction.
 * @param {string} outputAddress - The output address for the coinbase transaction.
 * @param {string} rewardAddress - The reward address.
 * @param {number} rewardAmount - The reward amount.
 * @returns {Object} - The coinbase transaction object.
 */
function createCoinbaseTransaction(outputAddress, rewardAddress, rewardAmount) {
    const coinbaseTx = {
        txid: '', // Will be filled in later when the transaction is broadcasted
        vout: 0,  // Output index
        scriptPubKey: `OP_DUP OP_HASH160 ${rewardAddress} OP_EQUALVERIFY OP_CHECKSIG`, // P2PKH script
        value: rewardAmount
    };
    return coinbaseTx;
}

/**
 * Checks if a Bitcoin address is valid.
 * @param {string} address - The Bitcoin address to be validated.
 * @returns {boolean} - True if the address is valid, otherwise false.
 */
function isValidBitcoinAddress(address) {
    const pattern = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
    return pattern.test(address);
}

// Export functions for external usage
module.exports = {
    createCoinbaseTransaction,
    isValidBitcoinAddress
};
