// Test the serverless function locally
const handler = require('./api/index.js');
const http = require('http');

const server = http.createServer((req, res) => {
    handler(req, res);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log(`Test URLs:`);
    console.log(`- http://localhost:${PORT}/`);
    console.log(`- http://localhost:${PORT}/health`);
    console.log(`- http://localhost:${PORT}/api/test`);
});