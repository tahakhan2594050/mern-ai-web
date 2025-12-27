// Ultra-minimal Vercel serverless function
const http = require('http');
const url = require('url');

module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    try {
        // Root endpoint
        if (path === '/' && method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'Server is Live!',
                status: 'OK',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'production'
            }));
            return;
        }

        // Health endpoint
        if (path === '/health' && method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            }));
            return;
        }

        // API test endpoint
        if (path === '/api/test' && method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'API is working!',
                timestamp: new Date().toISOString(),
                method: method,
                path: path,
                env: {
                    nodeEnv: process.env.NODE_ENV,
                    hasClerkKey: !!process.env.CLERK_SECRET_KEY,
                    hasDbUrl: !!process.env.DATABASE_URL
                }
            }));
            return;
        }

        // POST test endpoint
        if (path === '/api/test' && method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const data = body ? JSON.parse(body) : {};
                    res.statusCode = 200;
                    res.end(JSON.stringify({
                        message: 'POST endpoint working!',
                        timestamp: new Date().toISOString(),
                        receivedData: data
                    }));
                } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({
                        error: 'Invalid JSON',
                        timestamp: new Date().toISOString()
                    }));
                }
            });
            return;
        }

        // 404 for all other routes
        res.statusCode = 404;
        res.end(JSON.stringify({
            error: 'Route not found',
            path: path,
            method: method,
            timestamp: new Date().toISOString()
        }));

    } catch (error) {
        console.error('Server error:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            timestamp: new Date().toISOString()
        }));
    }
};