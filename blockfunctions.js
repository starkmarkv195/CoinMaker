const { bitcoin } = require('bitcoinjs-lib');

function createCoinbaseTransaction(outputAddress, rewardAddress, rewardAmount) {
    const coinbaseTx = {
        txid: '', // Will be filled in later when the transaction is broadcasted
        vout: 0,  // Output index
        scriptPubKey: bitcoin.payments.p2wpkh({ address: rewardAddress }), // Updated to use P2WPKH script
        value: rewardAmount
    };
    return coinbaseTx;
}

function isValidBitcoinAddress(address) {
    const pattern = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
    return pattern.test(address);
}

module.exports = {
    createCoinbaseTransaction,
    isValidBitcoinAddress
};