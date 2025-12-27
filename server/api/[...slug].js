// Catch-all route handler for any unmatched routes
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { slug } = req.query;
    const path = Array.isArray(slug) ? slug.join('/') : slug || '';

    return res.status(200).json({
        success: true,
        message: 'Catch-all route handler',
        requestedPath: `/${path}`,
        method: req.method,
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        note: 'This route is handled by the catch-all handler',
        availableRoutes: [
            '/ - Main endpoint',
            '/api/health - Health check',
            '/api/test - API test',
            '/docs - Documentation'
        ]
    });
}