// Bulletproof Vercel serverless function
export default async function handler(req, res) {
    // Set comprehensive CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Log request for debugging
    console.log(`${req.method} ${req.url}`);

    try {
        const { url, method } = req;
        const timestamp = new Date().toISOString();

        // Root endpoint
        if (url === '/' || url === '/index.html' || url === '') {
            return res.status(200).json({
                success: true,
                message: 'AI Web Server is Live!',
                status: 'OK',
                timestamp,
                server: 'Vercel Serverless',
                version: '2.0.0',
                endpoints: {
                    health: '/health',
                    apiTest: '/api/test',
                    docs: '/docs'
                }
            });
        }

        // Health check
        if (url === '/health' || url === '/api/health') {
            return res.status(200).json({
                success: true,
                status: 'healthy',
                timestamp,
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                environment: process.env.NODE_ENV || 'production',
                version: '2.0.0'
            });
        }

        // API test endpoint
        if (url === '/api/test' || url.startsWith('/api/test')) {
            return res.status(200).json({
                success: true,
                message: 'API Test Successful!',
                timestamp,
                method,
                url,
                environment: process.env.NODE_ENV || 'production',
                server: 'Vercel Serverless Function',
                requestHeaders: req.headers,
                version: '2.0.0'
            });
        }

        // Documentation endpoint
        if (url === '/docs' || url === '/api/docs') {
            return res.status(200).json({
                success: true,
                message: 'API Documentation',
                timestamp,
                version: '2.0.0',
                endpoints: [
                    { path: '/', method: 'GET', description: 'Server status' },
                    { path: '/health', method: 'GET', description: 'Health check' },
                    { path: '/api/test', method: 'GET', description: 'API test' },
                    { path: '/docs', method: 'GET', description: 'This documentation' }
                ],
                server: 'Vercel Serverless'
            });
        }

        // Handle any other API routes
        if (url.startsWith('/api/')) {
            return res.status(200).json({
                success: true,
                message: 'API endpoint reached',
                endpoint: url,
                method,
                timestamp,
                note: 'This is a placeholder. Add your specific API logic here.',
                version: '2.0.0'
            });
        }

        // Catch-all for any other routes
        return res.status(200).json({
            success: true,
            message: 'Server is responding',
            requestedUrl: url,
            method,
            timestamp,
            note: 'This route is handled by the catch-all handler',
            server: 'Vercel Serverless',
            version: '2.0.0',
            availableEndpoints: [
                '/ - Main endpoint',
                '/health - Health check',
                '/api/test - API test',
                '/docs - Documentation'
            ]
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message,
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        });
    }
}