// Vercel serverless function with proper routing
module.exports = (req, res) => {
    // Set CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Get the URL path
    const url = req.url || '/';
    const method = req.method || 'GET';

    console.log(`Request: ${method} ${url}`);

    try {
        // Root endpoint
        if (url === '/' || url === '/index.html') {
            res.status(200).json({
                message: 'Server is Live!',
                status: 'OK',
                timestamp: new Date().toISOString(),
                url: url,
                method: method,
                server: 'Vercel Serverless'
            });
            return;
        }

        // Health check endpoint
        if (url === '/health') {
            res.status(200).json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                version: '1.0.0'
            });
            return;
        }

        // API test endpoint
        if (url === '/api/test' || url.startsWith('/api/test')) {
            res.status(200).json({
                message: 'API Test Successful!',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'production',
                url: url,
                method: method,
                headers: req.headers
            });
            return;
        }

        // Handle any API routes
        if (url.startsWith('/api/')) {
            res.status(200).json({
                message: 'API endpoint reached',
                endpoint: url,
                method: method,
                timestamp: new Date().toISOString(),
                note: 'This is a placeholder response. Add your API logic here.'
            });
            return;
        }

        // Catch-all for any other routes (this prevents network errors)
        res.status(200).json({
            message: 'Route handler working',
            requestedUrl: url,
            method: method,
            timestamp: new Date().toISOString(),
            note: 'This route is not specifically handled but the server is responding',
            availableRoutes: [
                '/ - Main endpoint',
                '/health - Health check',
                '/api/test - API test',
                '/api/* - API routes'
            ]
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
            timestamp: new Date().toISOString(),
            url: url,
            method: method
        });
    }
};