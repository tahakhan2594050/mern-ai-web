// API test endpoint
module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.status(200).json({
        message: 'API Test Successful!',
        method: req.method,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        headers: req.headers,
        query: req.query || {},
        body: req.body || {}
    });
};