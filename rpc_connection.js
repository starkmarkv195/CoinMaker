module.exports = {
    rpc: {
        host: process.env.RPC_HOST || '127.0.0.1',
        port: parseInt(process.env.RPC_PORT) || 8333,
        user: process.env.RPC_USER || 'starkmarkv95',
        password: process.env.RPC_PASSWORD || 'Tythos55!!'
    }
};
