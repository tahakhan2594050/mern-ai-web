// Catch-all route handler for any unmatched routes
module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { slug } = req.query;
    const path = Array.isArray(slug) ? slug.join('/') : slug || '';

    res.status(200).json({
        message: 'Catch-all route handler',
        requestedPath: `/${path}`,
        method: req.method,
        timestamp: new Date().toISOString(),
        note: 'This route is handled by the catch-all handler',
        availableRoutes: [
            '/ - Main endpoint',
            '/api/health - Health check',
            '/api/test - API test'
        ]
    });
};