// API test endpoint
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    return res.status(200).json({
        success: true,
        message: 'API Test Successful!',
        method: req.method,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        version: '2.0.0',
        requestHeaders: req.headers,
        query: req.query || {},
        body: req.body || {}
    });
}