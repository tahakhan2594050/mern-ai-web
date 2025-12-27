// Ultra-simple Vercel serverless function
module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        // Simple routing
        if (req.url === '/' || req.url === '/health') {
            res.status(200).json({
                message: 'Server is Live!',
                status: 'OK',
                timestamp: new Date().toISOString(),
                url: req.url,
                method: req.method
            });
            return;
        }

        if (req.url === '/api/test') {
            res.status(200).json({
                message: 'API Test Successful!',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'production'
            });
            return;
        }

        // 404 for other routes
        res.status(404).json({
            error: 'Route not found',
            url: req.url,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};